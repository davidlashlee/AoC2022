"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var parser = function (data) {
    var dataContainer = [];
    var tempContainer = [];
    data.forEach(function (dataInstance) {
        if (dataInstance.length > 1) {
            tempContainer.push(parseFloat(dataInstance.toString()));
        }
        else {
            dataContainer === null || dataContainer === void 0 ? void 0 : dataContainer.push(tempContainer);
            tempContainer = new Array();
        }
    });
    return dataContainer;
};
var cleanUpData = function (nestedData) {
    var dataContainer = [];
    nestedData.forEach(function (data) {
        dataContainer.push(data.reduce(getSum, 0));
    });
    return dataContainer;
};
var getSum = function (total, num) {
    return total + num;
};
var findLargestThree = function (data) {
    /*let numOne = 0;
    let numTwo = 0;
    let numThree = 0;
    data.forEach((num) => {
      if (num >= numOne) numOne = num;
      else if (num <= numOne && num >= numTwo) numTwo = num;
      else if (num <= numOne && num <= numTwo && num >= numThree) numThree = num;
    });
    let returnNum: number[] = [];
    returnNum.push(numOne);
    returnNum.push(numTwo);
    returnNum.push(numThree);
    return returnNum;
    */
    return data.sort(compareNumbers);
};
var compareNumbers = function (a, b) {
    return b - a;
};
var sorted = findLargestThree(cleanUpData(parser(data)));
console.log(sorted);
var answer = 0;
answer += sorted[0];
answer += sorted[1];
answer += sorted[2];
console.log(answer);
