import * as fs from "fs";
import { sample } from "lodash";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let testData = fs.readFileSync("testData.txt", "utf-8").split("\n");

const parseData = (data: string[]): number[][] => {
  let returnArray: number[][] = [];
  data.forEach((row) => {
    let tempRow: number[] = [];
    let rowSize = row.length;
    for (let i = 0; i < rowSize; i++) {
      let tree = row[i];
      if (tree) {
        tempRow.push(parseFloat(tree));
      }
    }
    returnArray.push(tempRow);
  });
  return returnArray;
};

const checkNorth = (forest: number[][], row: number, column: number): boolean => {
  let currentTree = forest?.[row]?.[column];
  if (row <= 0) {
    return true;
  } else {
    for (let i = 0; i < row; i++) {
      let treeToCheck = forest?.[i]?.[column];
      if (typeof treeToCheck === "number" && typeof currentTree === "number" && treeToCheck >= currentTree) {
        return false;
      }
    }
    return true;
  }
};

const checkSouth = (forest: number[][], row: number, column: number): boolean => {
  let currentTree = forest?.[row]?.[column];
  let maxColumnSize = forest?.[row]!.length - 1;
  if (currentTree && row === maxColumnSize) {
    return true;
  } else {
    for (let i = row; i < maxColumnSize; i++) {
      let treeToCheck = forest?.[i + 1]?.[column];
      if (typeof treeToCheck === "number" && typeof currentTree === "number" && currentTree <= treeToCheck) {
        return false;
      }
    }
    return true;
  }
};

const checkEast = (forest: number[][], row: number, column: number): boolean => {
  let currentTree = forest?.[row]?.[column];
  let numberOfTreesInRow = forest?.[row]?.length! - 1;
  if (column === numberOfTreesInRow) {
    return true;
  }
  // splitArray so its only checking the ones to the right?
  const isVisible = forest?.[row]?.every((tree, treeIndex) => {
    if (treeIndex > column && tree >= currentTree!) {
      return false;
    } else return true;
  });
  if (isVisible) return isVisible;
  return false;
};

const checkWest = (forest: number[][], row: number, column: number): boolean => {
  let currentTree = forest?.[row]?.[column];
  if (column === 0) {
    return true;
  }
  // splitArray so its only checking the ones to the left?
  const isVisible = forest?.[row]?.every((tree, treeIndex) => {
    if (treeIndex < column && tree >= currentTree!) {
      return false;
    } else return true;
  });
  if (isVisible) return isVisible;
  else return false;
};

const checkData = (data: number[][]): { north: number; east: number; south: number; west: number } => {
  let count = {
    north: 0,
    east: 0,
    south: 0,
    west: 0,
  };

  data.forEach((dataRow, rowIndex) => {
    dataRow.forEach((dataInstance, columnIndex) => {
      let north = checkNorth(data, rowIndex, columnIndex);
      if (north) {
        count.north++;
      } else {
        let east = checkEast(data, rowIndex, columnIndex);
        if (east) {
          count.east++;
        } else {
          let south = checkSouth(data, rowIndex, columnIndex);
          if (south) {
            count.south++;
          } else {
            let west = checkWest(data, rowIndex, columnIndex);
            if (west) {
              count.west++;
            }
          }
        }
      }
    });
  });
  return count;
};
let results = checkData(parseData(data));
console.log(results);
console.log(results.north + results.east + results.west + results.south);
