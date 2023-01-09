"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionModel = void 0;
const initiateWeekController_1 = require("../../controller/initiateWeekController");
const newLeagueController_1 = require("../../controller/newLeagueController");
const randomNumber_utilities_1 = require("../../utilities/randomNumber.utilities");
const workers_1 = require("../../workers");
const oddAlgoService_1 = require("./oddAlgoService");
const { isMainThread, parentPort, workerData } = require('node:worker_threads');
/**
 *  when the league week is zero.
        - week should be 38
        - first leg should be 18 matches
        - this signifies a clean start for all team,
        - Gather all the teams and create a match
        -In a team of 20 each team faces their opponent only once for the first leg.
        - the structure should look this way
 */
let putAllMatchesHere = [];
class SelectionModel {
    constructor() {
        // map meeting
        this.mapMeeting = {
        // '0': { '10': true },
        // '1': { '19': true },
        // '2': { '18': true },
        // '3': { '17': true },
        // '4': { '16': true },
        // '5': { '15': true },
        // '6': { '14': true },
        // '7': { '13': true },
        // '8': { '12': true },
        // '9': { '11': true }
        };
        this.mapUpcomingTeam = {};
        this.savePlaying = [];
        this.teams = newLeagueController_1.default.registerTeams();
        this.newLeague = newLeagueController_1.default.establishLeague();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.newMeeting();
        });
    }
    _shuffleTeams(allTeams) {
        for (let i = 0; i < allTeams.length; i++) {
            let rand = (0, randomNumber_utilities_1.RandomNumber)(20);
            const tempItem = allTeams[rand];
            const begin = allTeams[i];
            allTeams[rand] = begin;
            allTeams[i] = tempItem;
        }
        return allTeams;
    }
    newMeeting() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 20 teams
                const club = (yield this.teams);
                if (club === null || club === void 0 ? void 0 : club.length) {
                    let shuffledTeam = this._shuffleTeams((_a = club[0]) === null || _a === void 0 ? void 0 : _a.teamEpl);
                    (0, workers_1.Workers)({ req: JSON.stringify(shuffledTeam) }, '/matchGeneratorWorker', (res) => __awaiter(this, void 0, void 0, function* () {
                        yield this.GenerateOdd(res);
                        // save current game data
                        let leagueInfo = (yield this.newLeague);
                        if (leagueInfo === null || leagueInfo === void 0 ? void 0 : leagueInfo.length) {
                            (0, initiateWeekController_1.saveGames)(leagueInfo[0], this.savePlaying);
                        }
                    }));
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    GenerateOdd(club) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [home, away] of club) {
                const o = yield (new oddAlgoService_1.default).checkTeamStandard(home, away);
                this.savePlaying.push(o);
            }
        });
    }
}
exports.SelectionModel = SelectionModel;
