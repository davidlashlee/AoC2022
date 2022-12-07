import * as fs from "fs";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let wareHouseData = data.slice(0, 7);
let instructionData = data.slice(10, data.length - 1);

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

let warehouse: Crate[][] = [];
let instructionList: Instructions[] = [];

const pullOutGrid = (rawData: string, rowIndex: number) => {
  let crates: Crate[] = [];
  let justLetters = rawData.replace(/[^a-zA-Z0-9]/g, "");
  justLetters.split("").forEach((letter) => {
    let letterIndex = rawData.indexOf(letter);
    if (typeof rawData[letterIndex] === "string") {
      rawData = rawData.replace(rawData[letterIndex]!, "_");
    }
    letterIndex === 1 ? crates.push(new Crate(letter, 1, rowIndex)) : crates.push(new Crate(letter, rowIndex, (letterIndex + 3) / 4));
  });
  return crates;
};

wareHouseData.forEach((warehouseRow) => {
  if (typeof data[warehouseRow.length] === "string") {
    warehouse.push(pullOutGrid(data[warehouseRow.length]!, warehouseRow.length + 1));
  }
});

instructionData.forEach((i) => {
  let parsed = i.replace(/\D/g, "");
  instructionList.push(new Instructions(parseFloat(parsed[0]!), parseFloat(parsed[1]!), parseFloat(parsed[2]!)));
});

// ITS FINE console.log(instructionList, "instructionList");
// console.log(warehouse);

console.log(warehouse[0]);

instructionList.forEach((instruction) => {
  for (let i = 0; i < instruction.moveAmount; i++) {
    if (warehouse && warehouse[instruction.from] && warehouse[instruction.to]) {
      let fromColumn = warehouse[instruction.from];
      let toColumn = warehouse[instruction.to];
      if (fromColumn && fromColumn?.[0]) {
        let crateToMove = fromColumn[0];
        toColumn?.unshift(crateToMove);
        fromColumn?.shift();
      }
    }
  }
});
/*
warehouse.forEach((column) => {
  console.log(column[0]);
}); */
