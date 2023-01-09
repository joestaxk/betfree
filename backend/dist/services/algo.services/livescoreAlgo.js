"use strict";
/**
* livescore
 */
Object.defineProperty(exports, "__esModule", { value: true });
class OddStrategy {
    constructor(teamA, teamB, strategy) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.strategy = strategy;
    }
    livesore() {
        let homeWinnings = [
            '1-0',
            '2-0',
            '3-0',
            '4-0',
            '5-0',
            '6-0',
            '2-1',
            '3-1',
            '3-2',
            '4-1',
            '4-2',
            '5-1',
        ];
        let scoreBothSide = [
            '0-0',
            '1-1',
            '2-2',
            '3-3'
        ];
        let awayWinning = [
            '0-1',
            '0-2',
            '0-3',
            '0-4',
            '0-5',
            '0-6',
            '1-2',
            '1-3',
            '2-3',
            '1-4',
            '2-4',
            '1-5',
        ];
        let generateScore = (look) => Math.floor(Math.random() * look);
        if (this.strategy === 'computer') {
            let side = homeWinnings.concat(scoreBothSide).concat(awayWinning);
            return side[generateScore(side.length)];
        }
        else if (this.strategy === "favourable") {
            let side = homeWinnings.concat(scoreBothSide);
            return side[generateScore(side.length)];
        }
        else if (this.strategy === "unfavourable") {
            let side = awayWinning.concat(scoreBothSide);
            return side[generateScore(side.length)];
        }
    }
    gatherTimming() {
        let q = () => Math.floor(Math.random() * (90 - 9) + 9);
        let liveScore = this.livesore();
        let homeside = liveScore.split('-')[0];
        let awayside = liveScore.split('-')[1];
        let lastH = 0;
        const h = Array(parseInt(homeside)).fill('0').map(() => {
            let cur = q();
            if (lastH === cur) {
                cur = q();
            }
            lastH = cur;
            return cur;
        });
        let lastA = 0;
        const a = Array(parseInt(awayside)).fill('0').map(() => {
            let cur = q();
            if (lastA === cur) {
                cur = q();
            }
            lastA = cur;
            return cur;
        });
        return [h, a];
    }
}
exports.default = OddStrategy;
