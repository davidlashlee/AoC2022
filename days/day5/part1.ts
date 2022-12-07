import * as fs from "fs";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let wareHouseData = data.slice(0, 8);
let instructionData = data.slice(10, data.length);
class Crate {
  column: number;
  row: number;
  contents: string;

  constructor(contents: string, row: number = -1, column: number = -1) {
    this.contents = contents;
    this.row = row;
    this.column = column;
  }
}
class Instructions {
  moveAmount: number;
  from: number;
  to: number;

  constructor(moveAmount: number, from: number, to: number) {
    this.moveAmount = moveAmount;
    this.from = from - 1;
    this.to = to - 1;
  }
}

let cratehouse: Crate[][] = [];
let warehouse: String[][] = [[], [], [], [], [], [], [], [], []];
let instructionList: Instructions[] = [];

const pullOutGrid = (rawData: string, rowIndex: number) => {
  let crates: Crate[] = [];
  let justLetters = rawData.replace(/[^a-zA-Z0-9]/g, "");
  justLetters.split("").forEach((letter) => {
    let letterIndex = rawData.indexOf(letter);
    if (typeof rawData[letterIndex] === "string") {
      rawData = rawData.replace(rawData[letterIndex]!, "_");
    }
    letterIndex === 1 ? crates.push(new Crate(letter, rowIndex, 1)) : crates.push(new Crate(letter, rowIndex, (letterIndex + 3) / 4));
  });
  return crates;
};

wareHouseData.forEach((warehouseRow, index) => {
  cratehouse.push(pullOutGrid(warehouseRow, index + 1));
});

cratehouse.forEach((crateRow) => {
  crateRow.forEach((crate) => {
    warehouse[crate.column - 1]?.push(crate.contents);
  });
});

instructionData.forEach((i) => {
  let parsed = i.replace(/\D/g, "");
  let from = parseInt(parsed[parsed.length - 2]!);
  let to = parseInt(parsed[parsed.length - 1]!);
  let moveAmount = parseInt(parsed.substring(0, parsed.length - 2));
  instructionList.push(new Instructions(moveAmount, from, to));
});

instructionList.forEach((instruction, index) => {
  let { moveAmount, to, from } = instruction;
  for (let i = 0; i < moveAmount; i++) {
    if (warehouse && warehouse[from] && warehouse[to]) {
      let fromColumn = warehouse[from];
      let toColumn = warehouse[to];
      if (fromColumn && fromColumn?.[0]) {
        let crateToMove = fromColumn[0];
        toColumn?.unshift(crateToMove);
        fromColumn?.shift();
      }
    }
  }
});

console.log(warehouse);
