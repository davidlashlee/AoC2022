"use strict";
exports.__esModule = true;
var fs = require("fs");
var lodash_1 = require("lodash");
var errors = 0;
var satchleData = fs.readFileSync("data.txt", "utf-8").split("\n");
var chopArray = function (data, subsetSize) {
    if (subsetSize === void 0) { subsetSize = 3; }
    var chopped = (0, lodash_1.chunk)(data, subsetSize);
    chopped.pop();
    return chopped;
};
var findMatchingSymbol = function (satchles) {
    console.log("findingSymbols in ", satchles);
    if (satchles && satchles[0] && satchles[1] && satchles[2]) {
        for (var i = 0; i < satchles[0].length; i++) {
            if (typeof satchles[0][i] === "string") {
                var letter = satchles[0][i];
                if (satchles[1].includes(letter) && satchles[2].includes(letter)) {
                    console.log("found a match", letter);
                    return letter;
                }
            }
        }
    }
    console.log("ERROR in findMatchingSymbolv2");
    errors++;
    return "errors";
};
var getScore = function (letter) {
    if (letter) {
        var ascii = letter.charCodeAt(0);
        if (letter.toUpperCase() === letter) {
            var score = ascii - 38;
            return score;
        }
        else {
            var score = ascii - 96;
            return score;
        }
    }
    return null;
};
var total = 0;
chopArray(satchleData).forEach(function (satchelSet) {
    var score = getScore(findMatchingSymbol(satchelSet));
    if (score) {
        total += score;
    }
});
console.log(total);
console.log(errors);
