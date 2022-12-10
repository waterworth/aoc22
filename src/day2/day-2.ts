import * as fs from "fs";
const input = fs.readFileSync("src/day2/input.txt", "utf-8");

const moves = {
  X: 1,
  Y: 2,
  Z: 3,
  A: 1,
  B: 2,
  C: 3,
};

type Moves = keyof typeof moves;

function part1() {
  let total = 0;

  const rounds = input.split("\n");

  for (const round of rounds) {
    const move = round.split(" ") as Moves[];
    total += getRoundScore(move[0], move[1]);
  }

  function getRoundScore(a: Moves, b: Moves) {
    const score = moves[b];
    if (moves[b] == moves[a]) return score + 3;
    if (doWeBeatThisFuckingElf(moves[b], moves[a])) return score + 6;
    else return score;
  }

  function doWeBeatThisFuckingElf(a: number, b: number) {
    switch (a) {
      case 1:
        return b == 3;
      case 2:
        return b == 1;
      case 3:
        return b == 2;
      default:
        return;
    }
  }
  return total;
}

function part2() {
  let total = 0;
  const rounds = input.split("\n");

  for (const round of rounds) {
    const move = round.split(" ") as Moves[];

    const offset = moves[move[1]] - 2;

    const choice = ((moves[move[0]] - 1 + offset + 3) % 3) + 1;

    total += choice + (offset ? 3 + offset * 3 : 3);
  }
  return total;
}

part1();
part2();
