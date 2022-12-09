import * as fs from "fs";
let data = fs.readFileSync("data.txt", "utf-8").split("\n");
let testData = fs.readFileSync("testData.txt", "utf-8").split("\n");

class File {
  size: number;
  name: string;

  constructor(size: number, name: string) {
    this.size = size;
    this.name = name;
  }
}

const buildDirectory = (input: string[]) => {
  let directory: Map<string, number> = new Map();
  directory.set("/", 0);
  let path = "";

  input.forEach((terminalInput) => {
    // create empty dir in directory
    if (terminalInput.slice(0, 4) === "dir ") {
      let tempDir = parseDirectory(terminalInput);
      let directoryKey = tempDir + "/";
      directory.set(path.concat(directoryKey), 0);
    } else if (terminalInput[0] === "$") {
      //handle cd
      path = cdHandler(terminalInput, path);
    } else {
      let tempFile = parseFile(terminalInput);
      directory.set(path.concat(tempFile.name), tempFile.size);
    }
    // do file stuff
  });
  return directory;
};

const parseFile = (input: string): File => {
  let parsed = input.split(" ");
  let fileSize = parsed[0];
  let fileName = parsed[1];
  if (fileSize && fileName) {
    return new File(parseInt(fileSize), fileName);
  } else throw Error;
};
// pull directory NAME out of "dir NAME"
const parseDirectory = (input: string): string => {
  let parsed = input.split(" ");
  let directoryName = parsed[1];
  if (directoryName) {
    return directoryName;
  } else throw Error;
};

const parseCD = (input: string): string => {
  let parsed = input.split(" ");
  let path = parsed[2];
  if (path) {
    return path;
  } else throw Error;
};

// remove last path and trailing "/" from path string
const cdUp = (path: string): string => {
  let splitPath = path.split("/");
  let rebuiltPath = "/";
  splitPath.forEach((subpath, index) => {
    if (subpath != "" && index < splitPath.length - 2) {
      rebuiltPath += subpath + "/";
    }
  });
  return rebuiltPath;
};

const cdHandler = (terminalInput: string, path: string): string => {
  if (terminalInput.slice(0, 6) === "$ cd /") {
    path = "/";
  } else if (terminalInput.slice(0, 7) === "$ cd ..") {
    path = cdUp(path);
  } else if (terminalInput.slice(0, 5) === "$ cd " && (terminalInput[5] !== "." || "/")) {
    path += parseCD(terminalInput) + "/";
  }
  return path;
};

const updateDirectoryFileSizes = (directory: Map<string, number>): Map<string, number> => {
  directory.forEach((size, path) => {
    let parents = pathsToClimb(path);
    parents.forEach((parent) => {
      let currentSize = directory.get(parent);
      if (typeof currentSize === "number") {
        directory.set(parent, currentSize + size);
      }
    });
  });
  return directory;
};

const pathsToClimb = (path: string): string[] => {
  let parents: string[] = [];
  let parsedPath = path.split("/");
  parsedPath = parsedPath.filter((e) => e !== "");
  let tempPath = "/";
  parsedPath.forEach((pathPart) => {
    parents.push(tempPath);
    tempPath = tempPath + pathPart + "/";
  });
  return parents;
};

let updatedDirectory = updateDirectoryFileSizes(buildDirectory(data));

let totalDiskSpace = 70000000;
let usedSpace = updatedDirectory.get("/");
let spaceLeft = totalDiskSpace - usedSpace!;
let targetAmountofSpace = 30000000 - spaceLeft;
let answer = 999999999999999;
updatedDirectory.forEach((value, key) => {
  if (key[key.length - 1] === "/" && value >= targetAmountofSpace && value <= answer) {
    answer = value;
  }
});

console.log(answer);
