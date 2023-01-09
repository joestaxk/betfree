import { teamType } from "../model/teamModel";
const { parentPort } = require('node:worker_threads');


parentPort.once('message', (value:any) => {
    handleMatchCalculation(value.port1, value.script)
});



let gatherWeek:any = []
function handleMatchCalculation(port1:any, value:any) {
    const club:[teamType] = JSON.parse(value.req);
    
    // Start large computation
    startSelection(club).then(res => {        
        port1.postMessage(res)
    })
}

function startSelection(club: [teamType]) {
   return new Promise((resolve,reject) => {
       for(let i = 0; i < 10; i++) {
           //  loop and get each club
           club = club
           let teamA = Math.floor(Math.random() * club.length);
           let teamB = Math.floor(Math.random() * club.length);
           
           let aPick = club[teamA];
           let bPick = club[teamB]
           
           while(teamA === teamB) {
               teamB = Math.floor(Math.random() * club.length);
               bPick = club[teamB]
            }
            
            club.splice(club.indexOf(aPick),1)
            club.splice(club.indexOf(bPick),1)
           
           gatherWeek.push([aPick, bPick])
           
           if(gatherWeek.length === 10) resolve(gatherWeek)
       }
   })
   
}

    
