"use strict";
exports.__esModule = true;
var fs = require("fs");
var gamesData = fs.readFileSync("data.txt", "utf-8").split("\n");
var myPlayScore;
(function (myPlayScore) {
    myPlayScore[myPlayScore["rock"] = 0] = "rock";
    myPlayScore[myPlayScore["paper"] = 1] = "paper";
    myPlayScore[myPlayScore["scissors"] = 2] = "scissors";
})(myPlayScore || (myPlayScore = {}));
var Game = /** @class */ (function () {
    function Game(theirPlay, myPlay) {
        var _this = this;
        this.startingScore = myPlayScore;
        this.parsePlayInput = function (play) {
            switch (play) {
                case "A":
                case "X": {
                    return "rock";
                }
                case "B":
                case "Y": {
                    return "paper";
                }
                case "C":
                case "Z": {
                    return "scissors";
                }
                default:
                    return "error";
            }
        };
        this.playGame = function () {
            var myPlay = _this.myPlay;
            var theirPlay = _this.theirPlay;
            console.log("playing the game", myPlay, theirPlay);
            if (myPlay === theirPlay)
                return 3;
            if (myPlay === "rock" && theirPlay === "scissors")
                return 6;
            if (myPlay === "paper" && theirPlay === "rock")
                return 6;
            if (myPlay === "scissors" && theirPlay === "paper")
                return 6;
            if (theirPlay === "rock" && myPlay === "scissors")
                return 0;
            if (theirPlay === "paper" && myPlay === "rock")
                return 0;
            if (theirPlay === "scissors" && myPlay === "paper")
                return 0;
            return 99999999999999999;
        };
        this.theirPlay = this.parsePlayInput(theirPlay);
        this.myPlay = this.parsePlayInput(myPlay);
        this.startingScore = myPlayScore;
        this.gameScore = this.playGame() + this.startingScore[this.myPlay] + 1;
    }
    return Game;
}());
var totals = 0;
gamesData.forEach(function (gameRound) {
    if (gameRound[0] && gameRound[2]) {
        var playTheGame = new Game(gameRound[0], gameRound[2]);
        totals += playTheGame.gameScore;
    }
});
console.log(totals);
