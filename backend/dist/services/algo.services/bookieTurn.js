"use strict";
/**
 * A bookie Maniputes and set the odd correctly.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class BookieTurn {
    constructor(teamA, teamB, s) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.strategy = s;
        this.odds;
    }
    ;
    BonusOdd(n) {
        return Math.random() + n;
    }
    aggregateOdd() {
        this.teamA.strength = (this.teamA.strength * 100);
        this.teamB.strength = (this.teamB.strength * 100);
        let bonus_odd = Math.abs(this.teamB.skill_point - this.teamA.skill_point) / 10;
        bonus_odd = bonus_odd < 3 ? bonus_odd + this.BonusOdd(3) : bonus_odd;
        if (this.teamA.skill_point > this.teamB.skill_point) {
            this.teamB.strength = this.teamB.strength + bonus_odd;
            this.teamA.strength = this.teamB.strength > 9 ? (this.teamA.strength + this.BonusOdd(.2)) - .5 : this.teamA.strength + this.BonusOdd(.2);
        }
        else if (this.teamB.skill_point > this.teamA.skill_point) {
            this.teamA.strength = this.teamA.strength + bonus_odd;
            this.teamB.strength = this.teamA.strength > 9 ? (this.teamB.strength + this.BonusOdd(.2)) - .5 : this.teamB.strength + this.BonusOdd(.2);
        }
        this.allOld();
        return this;
    }
    trunc(num) {
        let q = Math.trunc(num);
        let r = num.toString().indexOf('.');
        let g = (num.toString().slice(r, r + 3));
        g = g.length < 2 ? '0'.concat(g) : g;
        let t = parseFloat(q + g).toString().indexOf('.') == -1 ? parseFloat(q + g).toString().concat('.00') : parseFloat(q + g);
        return parseFloat(t) < 1 ? Math.round(parseFloat(t)) : t;
    }
    allOld() {
        let home = this.teamA.strength < 1 ? this.teamA.strength + 1 : this.teamA.strength;
        let away = this.teamB.strength;
        let getHighOdd = home > away ? home : away;
        let getLowOdd = home < away ? home : away;
        let correctScore = getHighOdd - getLowOdd;
        this.odds = {
            '1': this.trunc(home),
            'x': this.trunc(getHighOdd / this.BonusOdd(2)),
            '2': this.trunc(away),
            'dc': {
                '1x': this.trunc(home > this.BonusOdd(2) ? home / this.BonusOdd(2) : home),
                '12': this.trunc(getHighOdd / 3),
                '2x': this.trunc(away > this.BonusOdd(2) ? away / this.BonusOdd(2) : away)
            },
            '+': {
                // home
                '1-0': this.trunc(home + this.BonusOdd(correctScore)),
                '2-0': this.trunc((home + this.BonusOdd(correctScore)) * 2),
                '3-0': this.trunc((home + this.BonusOdd(correctScore)) * 3),
                '4-0': this.trunc((home + this.BonusOdd(correctScore)) * 4),
                '5-0': this.trunc((home + this.BonusOdd(correctScore)) * 5),
                '6-0': this.trunc((home + this.BonusOdd(correctScore)) * 10),
                //  draw
                '0-0': this.trunc((getHighOdd / getLowOdd) * this.BonusOdd(5)),
                '1-1': this.trunc((getHighOdd / getLowOdd) * this.BonusOdd(7)),
                '2-2': this.trunc((getHighOdd / getLowOdd) * this.BonusOdd(10)),
                '3-3': this.trunc((getHighOdd / getLowOdd) * this.BonusOdd(20)),
                //  away
                '0-1': this.trunc(away * this.BonusOdd(home)),
                '0-2': this.trunc(away * this.BonusOdd(home * 2)),
                '0-3': this.trunc(away * this.BonusOdd(home * 3)),
                '0-4': this.trunc(away * this.BonusOdd(home * 4)),
                '0-5': this.trunc(away * this.BonusOdd(home * 5)),
                '0-6': this.trunc(away * this.BonusOdd(home * 10)),
                //  combine home
                '2-1': this.trunc((home + this.BonusOdd(3)) * away),
                '3-1': this.trunc((home + this.BonusOdd(4)) * away),
                '3-2': this.trunc((home + this.BonusOdd(5)) * away),
                '4-1': this.trunc((home + this.BonusOdd(5)) * away),
                '4-2': this.trunc((home + this.BonusOdd(6)) * away),
                '5-1': this.trunc((home + this.BonusOdd(6)) * away),
                // combine away
                '1-2': this.trunc((away + this.BonusOdd(3)) * away),
                '1-3': this.trunc((away + this.BonusOdd(4)) * away),
                '2-3': this.trunc((away + this.BonusOdd(5)) * away),
                '1-4': this.trunc((away + this.BonusOdd(5)) * away),
                '2-4': this.trunc((away + this.BonusOdd(6)) * away),
                '1-5': this.trunc((away + this.BonusOdd(6)) * away),
            },
            'ov2': this.trunc(getHighOdd / this.BonusOdd(2.5)),
            'un2': this.trunc(getHighOdd / this.BonusOdd(1.5)),
            'gg': this.trunc(getHighOdd / this.BonusOdd(3)),
            'ng': this.trunc(getHighOdd / this.BonusOdd(2))
        };
    }
}
exports.default = BookieTurn;
