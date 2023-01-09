"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Odds_strengthForm;
Object.defineProperty(exports, "__esModule", { value: true });
const strengthFormular_1 = require("./strengthFormular");
class Odds {
    constructor() {
        _Odds_strengthForm.set(this, void 0);
        __classPrivateFieldSet(this, _Odds_strengthForm, strengthFormular_1.default, "f");
    }
    checkTeamStandard(teamA, teamB) {
        return __awaiter(this, void 0, void 0, function* () {
            // if(!teamA.win && !teamA.lose && !teamA.draw && !teamB.win && !teamB.lose && !teamB.draw) {
            // just starting a new league - LEAGUE 1            
            // Create a random odd algorithm and also winning pattern
            // return object that contains all the odds of that game.
            return yield (new (__classPrivateFieldGet(this, _Odds_strengthForm, "f"))()).buildTeamStrengthFormation(teamA, teamB);
            // }else {
            //     // This is a not week 1.
            // }
        });
    }
}
exports.default = Odds;
_Odds_strengthForm = new WeakMap();
