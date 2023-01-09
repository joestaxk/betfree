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
exports.saveGames = exports.IntiateWeekController = void 0;
const currentGamesModel_1 = require("../model/currentGamesModel");
const gameHistoryModel_1 = require("../model/gameHistoryModel");
const teamModel_1 = require("../model/teamModel");
const selectionAlgoService_1 = require("../services/algo.services/selectionAlgoService");
const crontask_services_1 = require("../services/crontask.services");
class IntiateWeekController extends selectionAlgoService_1.SelectionModel {
    constructor() {
        super();
    }
    preSaveGames() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let leagueInfo = (yield this.newLeague);
            if (leagueInfo === null || leagueInfo === void 0 ? void 0 : leagueInfo.length) {
                let ev = (_a = leagueInfo[0]) === null || _a === void 0 ? void 0 : _a.currentevent;
                switch (ev) {
                    case 'analysis':
                        // initiate new game
                        yield this.init();
                        // Prepare timestamp for new event
                        (0, crontask_services_1.default)();
                        // let save current game if this is new week 1. others we'll update         
                        // this.saveGames(leagueInfo, gameLists)
                        break;
                    case 'finished':
                        // game finished
                        //   start new weeek - update the week
                        break;
                    default:
                        break;
                }
            }
        });
    }
    getCurrentMatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ifCurrentGameExist = yield currentGamesModel_1.currentGameModel.find({});
                return ifCurrentGameExist;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLastMatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ifCurrentGameExist = yield gameHistoryModel_1.historyModel.find({});
                return ifCurrentGameExist;
            }
            catch (error) {
                throw error;
            }
        });
    }
    newTable() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tableList = yield teamModel_1.teamModel.find({});
                let leagueInfo = (yield this.newLeague);
                if (tableList.length && ((_a = tableList[0]) === null || _a === void 0 ? void 0 : _a.teamEpl) && (leagueInfo === null || leagueInfo === void 0 ? void 0 : leagueInfo.length)) {
                    tableList = (_b = tableList[0]) === null || _b === void 0 ? void 0 : _b.teamEpl;
                    const unorderedTable = tableList.map((team) => {
                        const jsonF = JSON.parse(team.score_graph);
                        return {
                            code_name: team.code_name,
                            point: (team.win + team.draw),
                            score_graph: jsonF.length > 5 ? jsonF.slice((jsonF.length - 5)) : jsonF,
                            team_name: team.team_name
                        };
                    });
                    // sort -
                    for (let i = 0; i < unorderedTable.length; i++) {
                        for (let j = 0; j < unorderedTable.length; j++) {
                            if (unorderedTable[i].v > unorderedTable[j].v) {
                                swap(unorderedTable, i, j);
                            }
                        }
                    }
                    function swap(n, i, j) {
                        let temp = n[i];
                        n[i] = n[j];
                        n[j] = temp;
                    }
                    return unorderedTable;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.IntiateWeekController = IntiateWeekController;
function saveGames(week, history) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check if this is a new week!
            const newWeek = (week.week - week.lastweek) === 1;
            let ifCurrentGameExist = yield currentGamesModel_1.currentGameModel.find({});
            if (!ifCurrentGameExist.length) {
                let new_gameModel = new currentGamesModel_1.currentGameModel({ currentgame: JSON.stringify(history), league: week.league, week: week.week });
                new_gameModel.save();
            }
            // this part this only passed if week 1 already exist.
            if (newWeek && ifCurrentGameExist.length && ifCurrentGameExist.length < 2) {
                // if this is a new week. save the current match
                let ifLastGameExist = yield gameHistoryModel_1.historyModel.find({});
                if (!ifLastGameExist.length) {
                    let save_lastgame = new gameHistoryModel_1.historyModel({ currentgame: (_a = ifCurrentGameExist[0]) === null || _a === void 0 ? void 0 : _a.currentgame, league: ifCurrentGameExist[0].league, week: (_b = ifCurrentGameExist[0]) === null || _b === void 0 ? void 0 : _b.week });
                    yield save_lastgame.save();
                }
                else {
                    yield gameHistoryModel_1.historyModel.updateOne({ where: { id: ifLastGameExist[0].id } }, { currentgame: ifCurrentGameExist[0].currentgame, league: (_c = ifCurrentGameExist[0]) === null || _c === void 0 ? void 0 : _c.league, week: (_d = ifCurrentGameExist[0]) === null || _d === void 0 ? void 0 : _d.week });
                }
                // for next game UPDATE the currentgames with new game.
                yield currentGamesModel_1.currentGameModel.updateOne({ where: { id: ifCurrentGameExist[0].id } }, { currentgame: JSON.stringify(history), league: week.league, week: week.week });
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.saveGames = saveGames;
