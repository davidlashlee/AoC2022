import * as fs from "fs";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let elfPairContainer: Elf[][] = [];
let containsCounter = 0;
class Elf {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

data.forEach((pair) => {
  let elfPair: Elf[] = [];
  let splitPair = pair.split(",");
  splitPair.forEach((elf) => {
    let elfInfo = elf.split("-");
    if (elfInfo[0] && elfInfo[1]) {
      let elfie = new Elf(parseFloat(elfInfo[0]), parseFloat(elfInfo[1]));
      elfPair.push(elfie);
    }
  });
  elfPairContainer.push(elfPair);
});

elfPairContainer.forEach((elfPair) => {
  let firstElf, secondElf;
  [firstElf, secondElf] = elfPair;
  if (firstElf && secondElf) {
    if ((firstElf.start <= secondElf.start && firstElf.end >= secondElf.start) || (secondElf.start <= firstElf.start && secondElf.end >= firstElf.start)) {
      containsCounter++;
    }
  }
});

console.log(containsCounter);
