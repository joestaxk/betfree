import mongoose, { Document } from "mongoose";
import { currentGameModel } from "../model/currentGamesModel";
import { historyModel } from "../model/gameHistoryModel";
import { currentevent, leagueInterface } from "../model/leagueModel";
import { teamModel, teamType } from "../model/teamModel";
import { SelectionModel } from "../services/algo.services/selectionAlgoService";
import TimeStamp from "../services/crontask.services";


export class IntiateWeekController extends SelectionModel  {
    constructor() {
        super();
    }
    
    

    async preSaveGames() {
        let leagueInfo = (await this.newLeague);
        if(leagueInfo?.length){
            let ev:currentevent = leagueInfo[0]?.currentevent;
            
            switch (ev) {
                case 'analysis':
                    // initiate new game
                    await this.init()
                    // Prepare timestamp for new event
                    TimeStamp()
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
    }
    
    async getCurrentMatches() {
        try {
            let ifCurrentGameExist = await currentGameModel.find({})
            return ifCurrentGameExist;
        } catch (error) {
            throw error
        }
    }
    
    async getLastMatches() {
        try {
            let ifCurrentGameExist = await historyModel.find({})
            return ifCurrentGameExist;
        } catch (error) {
            throw error
        }
    }
    
    async newTable() {
        try {
            let tableList = await teamModel.find({});
            let leagueInfo = (await this.newLeague);
            
            if(tableList.length && tableList[0]?.teamEpl && leagueInfo?.length) {
                tableList = tableList[0]?.teamEpl;
               
                const unorderedTable = tableList.map((team:teamType) => {
                   const jsonF:[] = JSON.parse(team.score_graph);
                   return {
                      code_name: team.code_name,
                      point: (team.win + team.draw),
                      score_graph: jsonF.length > 5 ? jsonF.slice((jsonF.length - 5)) : jsonF,
                      team_name: team.team_name
                   }
               })
               
                // sort -
                for(let i=0; i < unorderedTable.length; i++){
                    for(let j = 0; j < unorderedTable.length; j++) {
                        if(unorderedTable[i].v > unorderedTable[j].v){
                            swap(unorderedTable, i, j)
                        }
                    }
                }

                function swap(n:[],i:number,j:number) {
                    let temp = n[i];
                    n[i] = n[j]
                    n[j] = temp;
                }
                
                return unorderedTable;
            }
        } catch (error) {
            throw error
        }
    }
    
    
}


export async function saveGames(week:leagueInterface|any, history:any) {
    try {
        // check if this is a new week!
        const newWeek = (week.week - week.lastweek ) === 1;
        
        let ifCurrentGameExist = await currentGameModel.find({})
        if(!ifCurrentGameExist.length) {
            let new_gameModel = new currentGameModel({currentgame: JSON.stringify(history), league: week.league, week: week.week});
            new_gameModel.save()
        }

        // this part this only passed if week 1 already exist.
        if(newWeek && ifCurrentGameExist.length &&  ifCurrentGameExist.length < 2) {
            // if this is a new week. save the current match
            let ifLastGameExist = await historyModel.find({})
            
            if(!ifLastGameExist.length){
                let save_lastgame = new historyModel({currentgame: ifCurrentGameExist[0]?.currentgame, league: ifCurrentGameExist[0].league, week: ifCurrentGameExist[0]?.week});
                await save_lastgame.save()
            }else{
                await historyModel.updateOne({where: {id: ifLastGameExist[0].id }}, {currentgame: ifCurrentGameExist[0].currentgame, league: ifCurrentGameExist[0]?.league, week: ifCurrentGameExist[0]?.week});
            }
            // for next game UPDATE the currentgames with new game.
            await currentGameModel.updateOne({where: {id: ifCurrentGameExist[0].id }}, {currentgame: JSON.stringify(history), league: week.league, week: week.week})
        }
       
    } catch (error) {
        throw error
    }
    
}
