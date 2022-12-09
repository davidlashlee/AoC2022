import * as fs from "fs";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let datastream = data[0];

let chunkArray = (array: any[], size: number): any[][] => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
};

function checkForDuplicates(array: any[]): boolean {
  return new Set(array).size !== array.length;
}

if (datastream) {
  let input = datastream.split("");
  let chunked = chunkArray(input, 4);
  let answer: number = 0;
  chunked.every((chunk, i) => {
    if (checkForDuplicates(chunk) != true) {
      answer = (i + 1) * 4 - 1;
      return false;
    }
    return true;
  });
  console.log(answer);
}
