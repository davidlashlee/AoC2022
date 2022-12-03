"use strict";
exports.__esModule = true;
var fs = require("fs");
var satchleData = fs.readFileSync("data.txt", "utf-8").split("\n");
console.log(satchleData);
var divideSatchle = function (satchle) {
    var satchleLength = satchle.length;
    var firstHalf = satchle.substring(0, satchle.length / 2);
    var secondHalf = satchle.substring(satchleLength / 2);
    return [firstHalf, secondHalf];
};
var findMatchingSymbol = function (twoSatchles) {
    if (twoSatchles[1] && twoSatchles[0]) {
        for (var i = 0; i < twoSatchles[0].length; i++) {
            if (typeof twoSatchles[0][i] === "string") {
                var letter = twoSatchles[0][i];
                console.log("letter", letter, "satchles", twoSatchles, "i", i);
                if (letter) {
                    if (twoSatchles[1].includes(letter)) {
                        return letter;
                    }
                }
            }
        }
    }
    return null;
};
var getScore = function (letter) {
    if (letter) {
        var ascii = letter.charCodeAt(0);
        if (letter.toUpperCase() === letter) {
            // i dont know the right number to subtract from the ascii to make score argh!!1
            var score = ascii - 38;
            console.log("asci uppercase", letter, "score", score);
            return score;
        }
        else {
            var score = ascii - 96;
            console.log("asci lowercase", letter, "score", score);
            return score;
        }
    }
    return null;
};
var total = 0;
satchleData.forEach(function (satchle) {
    var score = getScore(findMatchingSymbol(divideSatchle(satchle)));
    if (score) {
        total += score;
    }
});
console.log(total);
