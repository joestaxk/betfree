"use strict";
/**
 * Generally computer gets to do all the job my randomly setting up time and when it switches strategy.
 * This strategy chances the game.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OddStrategy_instances, _OddStrategy_createTeamStrategy;
Object.defineProperty(exports, "__esModule", { value: true });
const leagueModel_1 = require("../../model/leagueModel");
const strategyModel_1 = require("../../model/strategyModel");
class OddStrategy {
    constructor(teamA, teamB) {
        _OddStrategy_instances.add(this);
        this.teamA = teamA;
        this.teamB = teamB;
        this.strategy = __classPrivateFieldGet(this, _OddStrategy_instances, "m", _OddStrategy_createTeamStrategy).call(this);
    }
    season() {
        return __awaiter(this, void 0, void 0, function* () {
            let leagueSeason = yield leagueModel_1.leagueModel.find({});
            return leagueSeason[0];
        });
    }
}
exports.default = OddStrategy;
_OddStrategy_instances = new WeakSet(), _OddStrategy_createTeamStrategy = function _OddStrategy_createTeamStrategy() {
    return __awaiter(this, void 0, void 0, function* () {
        // this can be really random.
        /**
            - Cheeck current week and league.
            - Query db if team already have ongoing strategy.
            - Make human assumption if team should win
            - create strategy
            - Save strategy.
        */
        let { week } = yield this.season();
        let ongoingstrategy = (team) => __awaiter(this, void 0, void 0, function* () {
            const STRATEGY = yield strategyModel_1.strategyModel.find({ team_id: team.id });
            let newStrategy;
            if (!Object.keys(STRATEGY).length) {
                if (week === 1) {
                    newStrategy = "computer";
                }
                else {
                    // check human assumption
                    let x = ['favourable', 'unfavourable'];
                    newStrategy = x[Math.floor(Math.random() * 2)];
                }
            }
            return newStrategy;
        });
        let newStrategy = yield ongoingstrategy(this.teamA);
        return newStrategy;
    });
};
