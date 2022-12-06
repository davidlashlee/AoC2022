"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var wareHouseData = data.slice(0, 7);
var instructionData = data.slice(10, data.length - 1);
var Crate = /** @class */ (function () {
    function Crate(contents, row, column) {
        if (row === void 0) { row = -1; }
        if (column === void 0) { column = -1; }
        this.contents = contents;
        this.row = row;
        this.column = column;
    }
    return Crate;
}());
var Instructions = /** @class */ (function () {
    function Instructions(moveAmount, from, to) {
        this.moveAmount = moveAmount;
        this.from = from;
        this.to = to;
    }
    return Instructions;
}());
var warehouse = [];
var instructionList = [];
var pullOutGrid = function (rawData, rowIndex) {
    var crates = [];
    var justLetters = rawData.replace(/[^a-zA-Z0-9]/g, "");
    justLetters.split("").forEach(function (letter) {
        var letterIndex = rawData.indexOf(letter);
        if (typeof rawData[letterIndex] === "string") {
            rawData = rawData.replace(rawData[letterIndex], "_");
        }
        letterIndex === 1 ? crates.push(new Crate(letter, 1, rowIndex)) : crates.push(new Crate(letter, rowIndex, (letterIndex + 3) / 4));
    });
    return crates;
};
wareHouseData.forEach(function (warehouseRow) {
    if (typeof data[warehouseRow.length] === "string") {
        warehouse.push(pullOutGrid(data[warehouseRow.length], warehouseRow.length + 1));
    }
});
instructionData.forEach(function (i) {
    var parsed = i.replace(/\D/g, "");
    instructionList.push(new Instructions(parseFloat(parsed[0]), parseFloat(parsed[1]), parseFloat(parsed[2])));
});
console.log(instructionList);
