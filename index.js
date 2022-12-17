"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var testData = fs.readFileSync("testData.txt", "utf-8").split("\n");
var parseData = function (data) {
    var returnArray = [];
    data.forEach(function (row) {
        var tempRow = [];
        var rowSize = row.length;
        for (var i = 0; i < rowSize; i++) {
            var tree = row[i];
            if (tree) {
                tempRow.push(parseFloat(tree));
            }
        }
        returnArray.push(tempRow);
    });
    return returnArray;
};
var parsedTrees = parseData(data);
var checkNorth = function (forest, row, column) {
    var _a, _b;
    var currentTree = (_a = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _a === void 0 ? void 0 : _a[column];
    if (row <= 0) {
        return true;
    }
    else {
        for (var i = 0; i < row; i++) {
            var treeToCheck = (_b = forest === null || forest === void 0 ? void 0 : forest[i]) === null || _b === void 0 ? void 0 : _b[column];
            console.log("I", i, "treeToCheck", treeToCheck, "currentTree", currentTree);
            if (typeof treeToCheck === "number" && typeof currentTree === "number" && treeToCheck >= currentTree) {
                return false;
            }
        }
        return true;
    }
};
var checkSouth = function (forest, row, column) {
    var _a, _b;
    var currentTree = (_a = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _a === void 0 ? void 0 : _a[column];
    var maxColumnSize = (forest === null || forest === void 0 ? void 0 : forest[row].length) - 1;
    if (currentTree && row === maxColumnSize) {
        return true;
    }
    else {
        for (var i = row; i < maxColumnSize; i++) {
            var treeToCheck = (_b = forest === null || forest === void 0 ? void 0 : forest[i + 1]) === null || _b === void 0 ? void 0 : _b[column];
            if (typeof treeToCheck === "number" && typeof currentTree === "number" && currentTree <= treeToCheck) {
                return false;
            }
        }
        return true;
    }
};
var checkEast = function (forest, row, column) {
    var _a, _b, _c;
    var currentTree = (_a = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _a === void 0 ? void 0 : _a[column];
    var numberOfTreesInRow = ((_b = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _b === void 0 ? void 0 : _b.length) - 1;
    if (column === numberOfTreesInRow) {
        return true;
    }
    // splitArray so its only checking the ones to the right?
    var isVisible = (_c = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _c === void 0 ? void 0 : _c.every(function (tree, treeIndex) {
        if (treeIndex > column && tree >= currentTree) {
            return false;
        }
        else
            return true;
    });
    if (isVisible)
        return isVisible;
    return false;
};
var checkWest = function (forest, row, column) {
    var _a, _b;
    var currentTree = (_a = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _a === void 0 ? void 0 : _a[column];
    if (column === 0) {
        return true;
    }
    // splitArray so its only checking the ones to the left?
    var isVisible = (_b = forest === null || forest === void 0 ? void 0 : forest[row]) === null || _b === void 0 ? void 0 : _b.every(function (tree, treeIndex) {
        if (treeIndex < column && tree >= currentTree) {
            return false;
        }
        else
            return true;
    });
    if (isVisible)
        return isVisible;
    else
        return false;
};
var checkData = function (data) {
    var count = {
        north: 0,
        east: 0,
        south: 0,
        west: 0
    };
    var container = [];
    data.forEach(function (dataRow, rowIndex) {
        var sample = [];
        dataRow.forEach(function (dataInstance, columnIndex) {
            var north = checkNorth(data, rowIndex, columnIndex);
            if (north) {
                console.log(rowIndex, columnIndex, "northed", dataInstance);
                count.north++;
                sample.push("N");
            }
            else {
                var east = checkEast(data, rowIndex, columnIndex);
                if (east) {
                    console.log(rowIndex, columnIndex, "easted");
                    count.east++;
                    sample.push("E");
                }
                else {
                    var south = checkSouth(data, rowIndex, columnIndex);
                    if (south) {
                        console.log(rowIndex, columnIndex, "southed");
                        count.south++;
                        sample.push("S");
                    }
                    else {
                        var west = checkWest(data, rowIndex, columnIndex);
                        if (west) {
                            console.log(rowIndex, columnIndex, "wested");
                            count.west++;
                            sample.push("W");
                        }
                        else {
                            sample.push("X");
                        }
                    }
                }
            }
        });
        container.push(sample);
    });
    console.log(container);
    return count;
};
var results = checkData(parseData(data));
console.log(results);
console.log(results.north + results.east + results.west + results.south);
