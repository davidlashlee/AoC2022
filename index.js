"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync("data.txt", "utf-8").split("\n");
var File = /** @class */ (function () {
    function File(size, name) {
        this.size = size;
        this.name = name;
    }
    return File;
}());
var buildDirectory = function (input) {
    var directory = new Map();
    var path = "";
    input.forEach(function (terminalInput) {
        // create empty dir in directory
        if (terminalInput.slice(0, 4) === "dir ") {
            var tempDir = parseDirectory(terminalInput);
            var directoryKey = tempDir + "/";
            directory.set(path.concat(directoryKey), 0);
        }
        else if (terminalInput[0] === "$") {
            //handle cd
            path = cdHandler(terminalInput, path);
        }
        else {
            var tempFile = parseFile(terminalInput);
            directory.set(path.concat(tempFile.name), tempFile.size);
        }
        // do file stuff
    });
    return directory;
};
var parseFile = function (input) {
    var parsed = input.split(" ");
    var fileSize = parsed[0];
    var fileName = parsed[1];
    if (fileSize && fileName) {
        return new File(parseInt(fileSize), fileName);
    }
    else
        throw Error;
};
// pull directory NAME out of "dir NAME"
var parseDirectory = function (input) {
    var parsed = input.split(" ");
    var directoryName = parsed[1];
    if (directoryName) {
        return directoryName;
    }
    else
        throw Error;
};
var parseCD = function (input) {
    var parsed = input.split(" ");
    var path = parsed[2];
    if (path) {
        return path;
    }
    else
        throw Error;
};
// remove last path and trailing "/" from path string
var cdUp = function (path) {
    var splitPath = path.split("/");
    var rebuiltPath = "/";
    splitPath.forEach(function (subpath, index) {
        if (subpath != "" && index < splitPath.length - 2) {
            rebuiltPath += subpath + "/";
        }
    });
    return rebuiltPath;
};
var cdHandler = function (terminalInput, path) {
    if (terminalInput.slice(0, 6) === "$ cd /") {
        console.log("found cd to root");
        path = "/";
    }
    else if (terminalInput.slice(0, 7) === "$ cd ..") {
        path = cdUp(path);
    }
    else if (terminalInput.slice(0, 5) === "$ cd " && (terminalInput[5] !== "." || "/")) {
        path += parseCD(terminalInput) + "/";
    }
    return path;
};
var updateDirectoryFileSizes = function (directory) {
    directory.forEach(function (size, path) {
        if (path !== "/") {
            var parents = pathsToClimb(path);
            parents.forEach(function (parent) {
                var currentSize = directory.get(parent);
                if (typeof currentSize === "number") {
                    directory.set(parent, currentSize + size);
                }
            });
        }
    });
    return directory;
};
var pathsToClimb = function (path) {
    var parents = [];
    var parsedPath = path.split("/");
    parsedPath = parsedPath.filter(function (e) { return e !== ""; });
    var tempPath = "/";
    parsedPath.forEach(function (pathPart) {
        parents.push(tempPath);
        tempPath = tempPath + pathPart + "/";
    });
    return parents;
};
var updatedDirectory = updateDirectoryFileSizes(buildDirectory(data));
var answer = 0;
updatedDirectory.forEach(function (value, key) {
    console.log(key);
    if (value <= 100000 && key[key.length - 1] === "/") {
        answer += value;
    }
});
console.log(answer);
