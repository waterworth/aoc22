import * as fs from "fs";
const input = fs.readFileSync("src/day3/input.txt", "utf-8");

const arr = input.split("\n");

function getValueOfLetter(letter: string) {
  if (letter == letter.toLowerCase()) {
    return letter.charCodeAt(0) - 96;
  } else return letter.charCodeAt(0) - 38;
}
function findCommonLetter(input: string) {
  const middle = Math.floor(input.length / 2);
  const start = input.substring(0, middle).split("");
  const end = input.substring(middle, input.length).split("");

  let output = "";

  const StartSet = new Set();

  for (const letter of start) {
    StartSet.has(letter) ? null : StartSet.add(letter);
  }
  for (const entry of end) {
    if (StartSet.has(entry)) {
      output = entry;
    }
  }

  return output;
}
function part1() {
  let output = 0;
  for (const string of arr) {
    output += getValueOfLetter(findCommonLetter(string));
  }
  return output;
}
part1();

//Part two
function part2() {
  let output = 0;
  for (let i = 0; i < arr.length; i += 3) {
    const set1 = new Set([...arr[i]]);
    const set2 = new Set([...arr[i + 1]]);
    const x = arr[i + 2];
    for (let j = 0; j < x.length; j++) {
      if (set1.has(x[j]) && set2.has(x[j])) {
        output += getValueOfLetter(x[j]);
        break;
      }
    }
  }
  return output;
}
part2();
