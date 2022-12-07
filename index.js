"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var wareHouseData = data.slice(0, 8);
var instructionData = data.slice(10, data.length);
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
        this.from = from - 1;
        this.to = to - 1;
    }
    return Instructions;
}());
var cratehouse = [];
var warehouse = [[], [], [], [], [], [], [], [], []];
var instructionList = [];
var pullOutGrid = function (rawData, rowIndex) {
    var crates = [];
    var justLetters = rawData.replace(/[^a-zA-Z0-9]/g, "");
    justLetters.split("").forEach(function (letter) {
        var letterIndex = rawData.indexOf(letter);
        if (typeof rawData[letterIndex] === "string") {
            rawData = rawData.replace(rawData[letterIndex], "_");
        }
        letterIndex === 1 ? crates.push(new Crate(letter, rowIndex, 1)) : crates.push(new Crate(letter, rowIndex, (letterIndex + 3) / 4));
    });
    return crates;
};
wareHouseData.forEach(function (warehouseRow, index) {
    if (typeof data[warehouseRow.length] === "string") {
        cratehouse.push(pullOutGrid(warehouseRow, index + 1));
    }
});
cratehouse.forEach(function (crateRow) {
    crateRow.forEach(function (crate) {
        var _a;
        (_a = warehouse[crate.column - 1]) === null || _a === void 0 ? void 0 : _a.push(crate.contents);
    });
});
instructionData.forEach(function (i) {
    var parsed = i.replace(/\D/g, "");
    var from = parseInt(parsed[parsed.length - 2]);
    var to = parseInt(parsed[parsed.length - 1]);
    var moveAmount = parseInt(parsed.substring(0, parsed.length - 2));
    instructionList.push(new Instructions(moveAmount, from, to));
});
console.log(warehouse);
instructionList.forEach(function (instruction, index) {
    var moveAmount = instruction.moveAmount, to = instruction.to, from = instruction.from;
    console.log(instruction);
    for (var i = 0; i < moveAmount; i++) {
        if (warehouse && warehouse[from] && warehouse[to]) {
            var fromColumn = warehouse[from];
            var toColumn = warehouse[to];
            if (fromColumn && (fromColumn === null || fromColumn === void 0 ? void 0 : fromColumn[0])) {
                var crateToMove = fromColumn[0];
                toColumn === null || toColumn === void 0 ? void 0 : toColumn.unshift(crateToMove);
                fromColumn === null || fromColumn === void 0 ? void 0 : fromColumn.shift();
            }
        }
    }
});
console.log(warehouse);
