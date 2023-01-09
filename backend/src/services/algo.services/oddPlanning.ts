/**
* After Looking up to the strength form, we do some calculations and send it off the bookie to manipulate
*/

import { teamType } from "../../model/teamModel";
import BookieTurn from "./bookieTurn";
import OddStrategy from "./oddStrategy";


export default class Oddplaning {
  static getOddFromProbability(probability:number) {
    let formular = 1/(probability);;
    return formular;
  }
  
  public static async planOdd(teamA:teamType, teamB:teamType) {
        // check strategy on this team.
         let s = new OddStrategy(teamA,teamB);
         
        // calculate odd
        s.teamA.strength = Oddplaning.getOddFromProbability(s.teamA.strength);
        s.teamB.strength = Oddplaning.getOddFromProbability(s.teamB.strength);
        s.strategy = (await s.strategy);
        
        //sendoff to bookie
        return (new BookieTurn(s.teamA, s.teamB, s.strategy)).aggregateOdd()
  }
  
}