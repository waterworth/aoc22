import * as fs from "fs";
const input = fs.readFileSync("src/day6/input.txt", "utf-8");

export function part1(input: string) {
  for (let i = 0; i < input.length; i++) {
    const set = new Set();
    for (let j = 0; j < 4; j++) {
      set.add(input[i + j]);
    }
    if (set.size === 4) {
      console.log("First example of 4 unique", i + 4);
      return i;
    }
  }
  return;
}

export function part2(input: string) {
  for (let i = 0; i < input.length; i++) {
    const set = new Set();
    for (let j = 0; j < 14; j++) {
      set.add(input[i + j]);
    }
    if (set.size === 14) {
      console.log("First example of 14 unique", i + 14);
      return i;
    }
  }
  return;
}

function solution() {
  part1(input);
  part2(input);
}

solution();
