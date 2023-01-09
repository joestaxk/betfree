"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { parentPort } = require('node:worker_threads');
parentPort.once('message', (value) => {
    handleMatchCalculation(value.port1, value.script);
});
let gatherWeek = [];
function handleMatchCalculation(port1, value) {
    const club = JSON.parse(value.req);
    // Start large computation
    startSelection(club).then(res => {
        port1.postMessage(res);
    });
}
function startSelection(club) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 10; i++) {
            //  loop and get each club
            club = club;
            let teamA = Math.floor(Math.random() * club.length);
            let teamB = Math.floor(Math.random() * club.length);
            let aPick = club[teamA];
            let bPick = club[teamB];
            while (teamA === teamB) {
                teamB = Math.floor(Math.random() * club.length);
                bPick = club[teamB];
            }
            club.splice(club.indexOf(aPick), 1);
            club.splice(club.indexOf(bPick), 1);
            gatherWeek.push([aPick, bPick]);
            if (gatherWeek.length === 10)
                resolve(gatherWeek);
        }
    });
}
