//
// Day 1: Calorie Counting
//

import { data } from "./data";

// Helper
function getCalorieCount(input: number[]): number {
  return input.reduce((p, x) => p + x);
}

// Part 1.
function findElfWithMostCalories(elves: number[][]) {
  let currentElf = { elfNumber: 0, totalCalories: 0 };
  for (const [idx, elf] of elves.entries()) {
    const cal = getCalorieCount(elf);
    if (currentElf.totalCalories <= cal) {
      currentElf = { elfNumber: idx, totalCalories: cal };
    }
  }
  return currentElf.totalCalories;
}

// Part 2
function findTop3Elves(elves: number[][]) {
  for (const [i, elf] of elves.entries()) {
    elves[i] = [getCalorieCount(elf)];
  }
  return getCalorieCount(
    elves
      .sort()
      .slice(elves.length - 4, elves.length - 1)
      .flat(),
  );
}

findElfWithMostCalories(data); //  69177
findTop3Elves(data); // 207456

/**
 * This is going to be using the .txt file because i shouldn't have wasted time doing that data
 * also going to just chain methods instead of writing fn's
 */

import * as fs from "fs";
const input = fs.readFileSync("src/day1/input.txt", "utf-8");

// 1
const part1 = () => {
  return input
    .split("\n\n")
    .map((x: string): number => {
      return x
        .split("\n")
        .map((stringNum: string) => parseInt(stringNum))
        .reduce((total: number, cal: number) => total + cal, 0);
    })
    .sort((a: number, b: number) => a - b)
    .at(-1);
};

const part2 = () => {
  return input
    .split("\n\n")
    .map((el) => {
      return el.split("\n").reduce((acc, num) => acc + parseInt(num), 0);
    })
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
};

part1(); //  69177
part2(); // 207456
