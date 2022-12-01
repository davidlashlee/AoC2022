import * as fs from "fs";

let data = fs.readFileSync("day1data.txt", "utf-8").split("\n");
let answer = 0;
data.forEach((dataInstance, index, container) => {
  console.log("dataInstance", dataInstance);
  if (index > 0 && container && index) {
    if (parseFloat(container[index]!) > parseFloat(container[index - 1]!)) {
      answer++;
    }
  }
});

console.log(answer);
