/**
 * Quite a simple task here, We get the playing team do the analysis as shown below and then return an object of odds.
 * 
 * 
 * -------|
          |
          |
oddAlgoService fetch the team
          |
          |
          |
Sends it off for strengthForm and oddStrategy
          |
          |
          |
OddStrategy strategies the odd and send it off to odd planing
          |
          | 
          |
Oddplaning will make sure all the odd are set before finallu hitting the bookie turn
          |
          |
          |
Where the odd are arrange and manipulated and return back here.
          |
          |
          |
          
          LOading
 */

import { teamType } from "../../model/teamModel";
import StrengthForm from "./strengthFormular";


export default class Odds {
    #strengthForm:new() => any;
    constructor() {
        this.#strengthForm = StrengthForm
    }
    
    async checkTeamStandard(teamA:teamType, teamB:teamType) {
        // if(!teamA.win && !teamA.lose && !teamA.draw && !teamB.win && !teamB.lose && !teamB.draw) {
            // just starting a new league - LEAGUE 1            
            // Create a random odd algorithm and also winning pattern
            // return object that contains all the odds of that game.
            return await (new this.#strengthForm()).buildTeamStrengthFormation(teamA,teamB);
        // }else {
        //     // This is a not week 1.
        
        // }
    }
}
