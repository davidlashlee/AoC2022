"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("day1data.txt", "utf-8").split("\n");
var answer = 0;
data.forEach(function (dataInstance, index, container) {
    console.log("dataInstance", dataInstance);
    if (index > 0 && container && index) {
        if (parseFloat(container[index]) > parseFloat(container[index - 1])) {
            answer++;
        }
    }
});
console.log(answer);
