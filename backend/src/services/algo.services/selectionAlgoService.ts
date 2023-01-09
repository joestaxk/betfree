import { saveGames } from "../../controller/initiateWeekController";
import newLeagueController from "../../controller/newLeagueController";
import { leagueInterface } from "../../model/leagueModel";
import { mapModel } from "../../model/mapMeetingModel";
import { teamType } from "../../model/teamModel";
import { RandomNumber } from "../../utilities/randomNumber.utilities";
import { Workers } from "../../workers";
import Odds from "./oddAlgoService";
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
let putAllMatchesHere:[] = [];
 
 export class SelectionModel {
    savePlaying:object[];
    
    teams:Promise<object[]>|object[]|any
    newLeague:Promise<leagueInterface[]>
    
    // map meeting
    mapMeeting:any = {
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
    }
    
    mapUpcomingTeam:Record<string, string[]> = {};
    constructor() {
        this.savePlaying = []
        
        this.teams = newLeagueController.registerTeams()
        this.newLeague = newLeagueController.establishLeague()
    }
    
    async init() {
        await this.newMeeting();
    }
    
  
    _shuffleTeams(allTeams:[teamType]) {
        for(let i = 0; i < allTeams.length; i++) {
            let rand = RandomNumber(20)
            const tempItem = allTeams[rand];
            const begin = allTeams[i];
            
            allTeams[rand] = begin
            allTeams[i] = tempItem
        }
        return allTeams;
    }
    
    
    async newMeeting():Promise<void> {
        try {
           // 20 teams
           const club = (await this.teams);
           if(club?.length) {
               let shuffledTeam = this._shuffleTeams(club[0]?.teamEpl)
               Workers({req:JSON.stringify(shuffledTeam)}, '/matchGeneratorWorker', async (res:any) => {
                   await this.GenerateOdd(res);
                   // save current game data
                   let leagueInfo = (await this.newLeague);
                   if(leagueInfo?.length) {
                       saveGames(leagueInfo[0], this.savePlaying)
                   }
               })
           }
           
       } catch (error) {
           throw error
       }
    }
    
    async GenerateOdd(club: [[teamType, teamType]]){
       for (const [home,away] of club) {
           const o = await (new Odds).checkTeamStandard(home,away)
           this.savePlaying.push(o);
       }      
    }
    
 }