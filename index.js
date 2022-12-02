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
                    return "rock";
                case "B":
                    return "paper";
                case "C":
                    return "scissors";
                default:
                    return "error";
            }
        };
        this.parseRoundObjective = function (input) {
            if (input === "X")
                return "loose";
            if (input === "Y")
                return "draw";
            if (input === "Z")
                return "win";
            else
                return "error";
        };
        this.playGame = function () {
            var myPlay = _this.myPlay;
            var theirPlay = _this.theirPlay;
            console.log("playing the game", myPlay, theirPlay);
            if (myPlay === "draw")
                return _this.startingScore[_this.theirPlay] + 4;
            if (myPlay === "loose") {
                if (theirPlay === "rock")
                    return 3;
                if (theirPlay === "paper")
                    return 1;
                if (theirPlay === "scissors")
                    return 2;
            }
            if (myPlay === "win") {
                if (theirPlay === "rock")
                    return 8;
                if (theirPlay === "paper")
                    return 9;
                if (theirPlay === "scissors")
                    return 7;
            }
            return 99999999999999999;
        };
        this.theirPlay = this.parsePlayInput(theirPlay);
        this.myPlay = this.parseRoundObjective(myPlay);
        this.startingScore = myPlayScore;
        this.gameScore = this.playGame();
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
