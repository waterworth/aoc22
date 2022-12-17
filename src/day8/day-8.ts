import * as fs from "fs";

const input = fs.readFileSync("src/day8/input.txt", "utf8");
// const input = fs.readFileSync("src/day8/test.txt", "utf8");
const lines = input
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number));

function part1(input: number[][]) {
  const output = input.map((row, index) => {
    return row.map((_, col) => isVisible(input, col, index));
  });
  const answer = output.flatMap((x) => x).filter((x: number) => x === 1).length;
  console.log(output.flatMap((x) => x).filter((x: number) => x === 1).length);

  return answer;
}

function isVisible(grid: number[][], col: number, row: number): number {
  const curr = grid[row][col];
  // get all the directions for the current tree
  const west = grid[row].slice(0, col);
  const east = grid[row].slice(col + 1);
  const north = grid.slice(0, row).map((x) => x[col]);
  const south = grid.slice(row + 1).map((x) => x[col]);
  // find the biggest trees
  const big = [west, north, east, south].map((t) => Math.max(...t));
  // find the smallest of the previously found biggest trees
  const small = Math.min(...big);
  return curr > small ? 1 : 0;
}

function getViewingDistance(line: number[], index: number) {
  if (Math.max(...line) < index) {
    return line.length;
  }
  return line.findIndex((t) => t >= index) + 1;
}

function getScenicScore(grid: number[][], col: number, row: number): number {
  const curr = grid[row][col];

  // pretty much the same as part1, we just reverse the west and north to be able to look back.
  const west = grid[row].slice(0, col).reverse();
  const east = grid[row].slice(col + 1);
  const north = grid
    .slice(0, row)
    .map((x) => x[col])
    .reverse();
  const south = grid.slice(row + 1).map((x) => x[col]);

  const score = [west, north, east, south]
    .map((x) => getViewingDistance(x, curr))
    .reduce((a, b) => {
      return a * b;
    }, 1);

  return score;
}

function part2(input: number[][]) {
  const getScore = input.map((row, i) => {
    return row.map((_, j) => getScenicScore(input, j, i));
  });
  const answer = Math.max(...getScore.map((arr) => Math.max(...arr)));
  console.log(answer);
  return answer;
}

function solution() {
  part1(lines);
  part2(lines);
}

solution();
