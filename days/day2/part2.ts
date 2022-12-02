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
    this.myPlay = this.parseRoundObjective(myPlay);
    this.startingScore = myPlayScore;
    this.gameScore = this.playGame();
  }

  parsePlayInput = (play: string) => {
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

  parseRoundObjective = (input: string) => {
    if (input === "X") return "loose";
    if (input === "Y") return "draw";
    if (input === "Z") return "win";
    else return "error";
  };

  playGame = (): number => {
    let myPlay = this.myPlay;
    let theirPlay = this.theirPlay;
    console.log("playing the game", myPlay, theirPlay);
    if (myPlay === "draw") return this.startingScore[this.theirPlay as PlayScoreTypes] + 4;
    if (myPlay === "loose") {
      if (theirPlay === "rock") return 3;
      if (theirPlay === "paper") return 1;
      if (theirPlay === "scissors") return 2;
    }
    if (myPlay === "win") {
      if (theirPlay === "rock") return 8;
      if (theirPlay === "paper") return 9;
      if (theirPlay === "scissors") return 7;
    }
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
