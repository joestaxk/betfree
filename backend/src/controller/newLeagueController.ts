import { Document } from "mongoose";
import { leagueModel } from "../model/leagueModel";
import { teamModel } from "../model/teamModel";
import { premierLeague } from "../utilities/team.utilities";

export default class newLeagueController {
    static async establishLeague(inc:boolean=false) {
        try {
            
            let ifExist = await leagueModel.find({});
            
            if(!ifExist?.length) {
                let newLeague:Document = new leagueModel({
                    league: 1389,
                    week: 1,
                    lastweek: 0,
                    currentevent: 'analysis'
                })
                return await newLeague.save();
            }else{
                if(inc) {
                   let league:number = ifExist?.league;
                   let week:number = ifExist?.week + 1;
                   let lastweek = ifExist?.lastweek + 1
                   const updateLeague = leagueModel.updateOne({where: {id: ifExist?.id}}, {
                        league,
                        week,
                        lastweek,
                        currentevent: 'analysis'
                    })
                }
                return ifExist
            }
            
        } catch (error) {
            throw new Error(error)
        }
    }
    
    static async registerTeams() {
        try {
            let newTeam = new teamModel({
                teamEpl: premierLeague
            })
                        
            let ifExist:object[] = await teamModel.find({});
            
            if(ifExist?.length) {
                return ifExist;
            }else {
                await newTeam.save()
            }
            
        } catch (error) {
            throw new Error(error)
        }
    }
    
    // static async init() {
    //     try {
    //         let startSeason = await newLeagueController.establishLeague();
    //         let registerTeam = await newLeagueController.registerTeams();
            
    //         if((startSeason)?.length&&(registerTeam)?.length) {
    //             console.log('League Established successfully');
    //             console.log('Team registered once successfully');
    //         }
    //     } catch (error) {
    //         throw error
    //     }

    // }
}