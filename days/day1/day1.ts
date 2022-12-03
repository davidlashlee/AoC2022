import * as fs from "fs";

let data = fs.readFileSync("day1data.txt", "utf-8").split("\n");

const parser = (data: string[]) => {
  let dataContainer: number[][] = [];
  let tempContainer: number[] = [];
  data.forEach((dataInstance) => {
    if (dataInstance.length > 1) {
      tempContainer.push(parseFloat(dataInstance));
    } else {
      dataContainer?.push(tempContainer);
      tempContainer = new Array();
    }
  });
  return dataContainer as number[][];
};

const cleanUpData = (nestedData: number[][]) => {
  let dataContainer: number[] = [];
  nestedData.forEach((data) => {
    dataContainer.push(data.reduce(getSum, 0));
  });
  return dataContainer;
};

const getSum = (total: number, num: number) => {
  return total + num;
};

const sortDataBySum = (data: number[]): number[] => {
  return data.sort(compareNumbers);
};

let compareNumbers = (a: number, b: number): number => {
  return b - a;
};

let sorted = sortDataBySum(cleanUpData(parser(data)));

console.log(sorted);

let answer = 0;

answer += sorted[0]!;
answer += sorted[1]!;
answer += sorted[2]!;

console.log(answer);
