"use strict";
/**
* After Looking up to the strength form, we do some calculations and send it off the bookie to manipulate
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
Object.defineProperty(exports, "__esModule", { value: true });
const bookieTurn_1 = require("./bookieTurn");
const oddStrategy_1 = require("./oddStrategy");
class Oddplaning {
    static getOddFromProbability(probability) {
        let formular = 1 / (probability);
        ;
        return formular;
    }
    static planOdd(teamA, teamB) {
        return __awaiter(this, void 0, void 0, function* () {
            // check strategy on this team.
            let s = new oddStrategy_1.default(teamA, teamB);
            // calculate odd
            s.teamA.strength = Oddplaning.getOddFromProbability(s.teamA.strength);
            s.teamB.strength = Oddplaning.getOddFromProbability(s.teamB.strength);
            s.strategy = (yield s.strategy);
            //sendoff to bookie
            return (new bookieTurn_1.default(s.teamA, s.teamB, s.strategy)).aggregateOdd();
        });
    }
}
exports.default = Oddplaning;
