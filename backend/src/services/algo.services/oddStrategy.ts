/**
 * Generally computer gets to do all the job my randomly setting up time and when it switches strategy. 
 * This strategy chances the game.
 */

import { leagueInterface, leagueModel } from "../../model/leagueModel";
import { strategyModel } from "../../model/strategyModel";
import { teamType } from "../../model/teamModel";

export type strategyOption = 'favourable' | 'computer' | 'unfavourable';

export default class OddStrategy {
    strategy:Promise<any>;
    teamA:teamType;
    teamB:teamType;
    
    constructor(teamA:teamType,teamB:teamType) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.strategy = this.#createTeamStrategy();
    }
    
    async season() {
        let leagueSeason:[leagueInterface] = await leagueModel.find({});
        return leagueSeason[0]
    }
    
    async #createTeamStrategy() {
        // this can be really random.
        
        /**
            - Cheeck current week and league.
            - Query db if team already have ongoing strategy.
            - Make human assumption if team should win
            - create strategy
            - Save strategy.
        */        
        
        let { week } = await this.season();
        
        let ongoingstrategy = async (team:teamType) => {
            
            const STRATEGY = await strategyModel.find({team_id: team.id});
            let newStrategy:strategyOption|string;
            
            if(!Object.keys(STRATEGY).length) {                 
                if(week === 1) {
                    newStrategy = "computer"  
                }else {
                    // check human assumption
                    let x = ['favourable', 'unfavourable'];
                    
                    newStrategy = x[Math.floor(Math.random() * 2)]
                }
            }
            return newStrategy;
        }
        let newStrategy  = await ongoingstrategy(this.teamA);
        
        return newStrategy;
    }
}