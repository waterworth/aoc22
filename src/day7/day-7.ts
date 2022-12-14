import * as fs from "fs";
const input = fs.readFileSync("src/day7/input.txt", "utf-8");
const lines = input.split(/\r?\n/);

class Folder {
  name: string;
  parentFolder?: Folder;
  size: number;
  subFolders: Record<string, Folder>;
  // Create a folder with 0 size.
  constructor(name: string, parentFolder?: Folder) {
    this.name = name;
    this.parentFolder = parentFolder;
    this.size = 0;
    this.subFolders = {};
  }
  // Get size of all subfolders
  public getTotalSize(cb?: (totalSize: number) => void): number {
    const totalSize = Object.values(this.subFolders).reduce(
      (sum: number, folder) => {
        sum += folder.getTotalSize(cb);
        return sum;
      },
      this.size,
    );
    if (cb) cb(totalSize);
    return totalSize;
  }
}

class FileSystem {
  public root = new Folder("/");
  public currentDir = this.root;
  constructor(lines: string[]) {
    lines.forEach((line) => {
      if (line.startsWith("$")) {
        this.readCommand(line);
      } else {
        this.readDirectory(line);
      }
    });
  }
  private readCommand(line: string): void {
    const [, name, arg] = line.split(" ");
    if (name === "ls") return;
    if (name === "cd") {
      if (arg === "..") {
        if (!this.currentDir.parentFolder) {
          throw new Error("Wrong command! Can't go up from the root.");
        }
        this.currentDir = this.currentDir.parentFolder;
      } else if (arg === "/") {
        this.currentDir = this.root;
      } else {
        this.currentDir = this.currentDir.subFolders[arg];
      }
    }
  }
  private readDirectory(line: string): void {
    if (line.startsWith("dir")) {
      const [, dirName] = line.split(" ");
      this.currentDir.subFolders[dirName] = new Folder(
        dirName,
        this.currentDir,
      );
    } else {
      const [fileSize] = line.split(" ");
      this.currentDir.size += +fileSize;
    }
  }
}

function part1(input: string[]): number {
  const fileSystem = new FileSystem(input);
  let sum = 0;
  fileSystem.root.getTotalSize((size) => {
    if (size < 100000) {
      sum += size;
    }
  });
  console.log("Part 1:", sum);
  return sum;
}

function part2(input: string[]): number {
  const fileSystem = new FileSystem(input);
  const missingSpace = 30000000 - (70000000 - fileSystem.root.getTotalSize());
  let smallestSubFolderToDelete = Infinity;
  fileSystem.root.getTotalSize((size) => {
    if (size > missingSpace && smallestSubFolderToDelete > size) {
      smallestSubFolderToDelete = size;
    }
  });
  console.log("Part 2 Answer:", smallestSubFolderToDelete);
  return smallestSubFolderToDelete;
}

function solution() {
  part1(lines);
  part2(lines);
}

solution();
