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
const leagueModel_1 = require("../model/leagueModel");
const teamModel_1 = require("../model/teamModel");
const team_utilities_1 = require("../utilities/team.utilities");
class newLeagueController {
    static establishLeague(inc = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ifExist = yield leagueModel_1.leagueModel.find({});
                if (!(ifExist === null || ifExist === void 0 ? void 0 : ifExist.length)) {
                    let newLeague = new leagueModel_1.leagueModel({
                        league: 1389,
                        week: 1,
                        lastweek: 0,
                        currentevent: 'analysis'
                    });
                    return yield newLeague.save();
                }
                else {
                    if (inc) {
                        let league = ifExist === null || ifExist === void 0 ? void 0 : ifExist.league;
                        let week = (ifExist === null || ifExist === void 0 ? void 0 : ifExist.week) + 1;
                        let lastweek = (ifExist === null || ifExist === void 0 ? void 0 : ifExist.lastweek) + 1;
                        const updateLeague = leagueModel_1.leagueModel.updateOne({ where: { id: ifExist === null || ifExist === void 0 ? void 0 : ifExist.id } }, {
                            league,
                            week,
                            lastweek,
                            currentevent: 'analysis'
                        });
                    }
                    return ifExist;
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static registerTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newTeam = new teamModel_1.teamModel({
                    teamEpl: team_utilities_1.premierLeague
                });
                let ifExist = yield teamModel_1.teamModel.find({});
                if (ifExist === null || ifExist === void 0 ? void 0 : ifExist.length) {
                    return ifExist;
                }
                else {
                    yield newTeam.save();
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = newLeagueController;
