import * as fs from "fs";

interface satchlePair {}

let satchleData = fs.readFileSync("data.txt", "utf-8").split("\n");

console.log(satchleData);

const divideSatchle = (satchle: string): string[] => {
  let satchleLength = satchle.length;
  let firstHalf = satchle.substring(0, satchle.length / 2);
  let secondHalf = satchle.substring(satchleLength / 2);
  return [firstHalf, secondHalf];
};

const findMatchingSymbol = (twoSatchles: string[]): string | null => {
  if (twoSatchles[1] && twoSatchles[0]) {
    for (let i = 0; i < twoSatchles[0].length; i++) {
      if (typeof twoSatchles[0][i] === "string") {
        let letter = twoSatchles[0][i];
        if (letter) {
          if (twoSatchles[1].includes(letter)) {
            return letter;
          }
        }
      }
    }
  }
  return null;
};

const getScore = (letter: string | null): number | null => {
  if (letter) {
    const ascii = letter.charCodeAt(0);
    if (letter.toUpperCase() === letter) {
      let score = ascii - 38;
      return score;
    } else {
      let score = ascii - 96;
      return score;
    }
  }
  return null;
};
let total = 0;
satchleData.forEach((satchle) => {
  let score = getScore(findMatchingSymbol(divideSatchle(satchle)));
  if (score) {
    total += score;
  }
});

console.log(total);
