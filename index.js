"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var elfPairContainer = [];
var fullyContainsCounter = 0;
var Elf = /** @class */ (function () {
    function Elf(start, end) {
        this.start = start;
        this.end = end;
    }
    return Elf;
}());
data.forEach(function (pair) {
    var elfPair = [];
    var splitPair = pair.split(",");
    splitPair.forEach(function (elf) {
        var elfInfo = elf.split("-");
        console.log("elfInfo", elfInfo);
        if (elfInfo[0] && elfInfo[1]) {
            var elfie = new Elf(parseFloat(elfInfo[0]), parseFloat(elfInfo[1]));
            elfPair.push(elfie);
        }
    });
    elfPairContainer.push(elfPair);
    console.log(elfPair);
});
var errorCount = 0;
elfPairContainer.forEach(function (elfPair) {
    var firstElf, secondElf;
    firstElf = elfPair[0], secondElf = elfPair[1];
    if (firstElf && secondElf) {
        if ((firstElf.start <= secondElf.start && firstElf.end >= secondElf.start) || (secondElf.start <= firstElf.start && secondElf.end >= firstElf.start)) {
            //console.log("firstElf contains secondElf area", firstElf, secondElf);
            fullyContainsCounter++;
        }
    }
    else
        errorCount++;
});
console.log(fullyContainsCounter);
