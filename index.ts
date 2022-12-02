import * as fs from "fs";

let gamesData = fs.readFileSync("data.txt", "utf-8").split("\n");

enum myPlayScore {
  "rock",
  "paper",
  "scissors",
}

declare type PlayScoreTypes = keyof typeof myPlayScore;

class Game {
  theirPlay: string;
  myPlay: string;
  startingScore = myPlayScore;
  gameScore: number;

  constructor(theirPlay: string, myPlay: string) {
    this.theirPlay = this.parsePlayInput(theirPlay);
    this.myPlay = this.parsePlayInput(myPlay);
    this.startingScore = myPlayScore;
    this.gameScore = this.playGame() + this.startingScore[this.myPlay as PlayScoreTypes] + 1;
  }

  parsePlayInput = (play: string) => {
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

  playGame = (): number => {
    let myPlay = this.myPlay;
    let theirPlay = this.theirPlay;
    console.log("playing the game", myPlay, theirPlay);
    if (myPlay === theirPlay) return 3;
    if (myPlay === "rock" && theirPlay === "scissors") return 6;
    if (myPlay === "paper" && theirPlay === "rock") return 6;
    if (myPlay === "scissors" && theirPlay === "paper") return 6;
    if (theirPlay === "rock" && myPlay === "scissors") return 0;
    if (theirPlay === "paper" && myPlay === "rock") return 0;
    if (theirPlay === "scissors" && myPlay === "paper") return 0;
    return 99999999999999999;
  };
}

let totals = 0;

gamesData.forEach((gameRound) => {
  if (gameRound[0] && gameRound[2]) {
    let playTheGame = new Game(gameRound[0], gameRound[2]);
    totals += playTheGame.gameScore;
  }
});

console.log(totals);
