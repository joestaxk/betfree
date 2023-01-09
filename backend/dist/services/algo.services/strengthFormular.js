"use strict";
/**
    Just like a table, we'll create a lookup to how our odd runs
*/
Object.defineProperty(exports, "__esModule", { value: true });
const oddPlanning_1 = require("./oddPlanning");
function GenerateRandomBtw2Num(max, min) {
    return Math.random() * (max - min) + (min);
}
const strengthFormation = {
    '5': GenerateRandomBtw2Num(100, 72),
    '4': GenerateRandomBtw2Num(70, 58),
    '3': GenerateRandomBtw2Num(60, 50),
    '2': GenerateRandomBtw2Num(49, 30),
    '1': GenerateRandomBtw2Num(45, 20),
};
class StrengthForm {
    buildTeamStrengthFormation(teamA, teamB) {
        teamA.strength = strengthFormation[teamA.strength];
        teamB.strength = strengthFormation[teamB.strength];
        // check oddPlanning
        return oddPlanning_1.default.planOdd(teamA, teamB);
    }
}
exports.default = StrengthForm;
