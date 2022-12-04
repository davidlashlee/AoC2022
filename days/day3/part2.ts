import * as fs from "fs";
import { chunk } from "lodash";
let satchleData = fs.readFileSync("data.txt", "utf-8").split("\n");

const chopArray = (data: string[], subsetSize = 3): string[][] => {
  let chopped = chunk(data, subsetSize);
  chopped.pop();
  return chopped;
};

const findMatchingSymbol = (satchles: string[]) => {
  let firstSatchle, secondSatchle, thirdSatchle;
  [firstSatchle, secondSatchle, ...thirdSatchle] = satchles;
  if (satchles && firstSatchle && secondSatchle && thirdSatchle) {
    for (let i = 0; i < firstSatchle.length; i++) {
      if (typeof firstSatchle[i] === "string") {
        let letter = firstSatchle[i] as string;
        if (secondSatchle.includes(letter) && thirdSatchle.includes(letter)) {
          return letter;
        }
      }
    }
  }
  return "errors";
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

chopArray(satchleData).forEach((satchelSet) => {
  let score = getScore(findMatchingSymbol(satchelSet));
  if (score) {
    total += score;
  }
});
console.log(total);
