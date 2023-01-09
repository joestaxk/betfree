/**
    Just like a table, we'll create a lookup to how our odd runs
*/

import { teamType } from "../../model/teamModel"
import Oddplaning from "./oddPlanning";

function GenerateRandomBtw2Num(max:number, min:number) {
    return Math.random() * (max - min) + (min)
}
const strengthFormation:any = {
    '5': GenerateRandomBtw2Num(100, 72),
    '4': GenerateRandomBtw2Num(70, 58),
    '3': GenerateRandomBtw2Num(60, 50),
    '2': GenerateRandomBtw2Num(49, 30),
    '1': GenerateRandomBtw2Num(45, 20),
}

export default class StrengthForm {
    buildTeamStrengthFormation(teamA: teamType, teamB: teamType) {
        teamA.strength = strengthFormation[teamA.strength];
        teamB.strength = strengthFormation[teamB.strength];
        // check oddPlanning
        return Oddplaning.planOdd(teamA, teamB)
    }
}