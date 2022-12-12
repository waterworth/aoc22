import * as fs from "fs";

const input = fs.readFileSync("src/day5/input.txt", "utf-8");

function solution(): string {
  const lines = input.split("\n");
  // 0 indexed columns
  const stacks = transformIntoStacks(lines.splice(0, 8));
  const actionList = getActions(lines.splice(2, lines.length));

  moveThoseBoxesPart2(stacks, actionList[0]);

  for (const actions of actionList) {
    // Part 1
    //moveThoseBoxes(stacks, actions);

    // Part 2
    moveThoseBoxesPart2(stacks, actions);
  }

  console.log(getAllTopItems(stacks));
  return getAllTopItems(stacks);
}

function transformIntoStacks(rows: string[]) {
  // lol im sure there's a better way to do this
  const stacks: string[][] = [[], [], [], [], [], [], [], [], []];
  for (const row of rows) {
    const rowAsArray = row.split("");
    let i = 0;
    while (rowAsArray.length) {
      const box = rowAsArray.splice(0, 4);
      if (box.join("").trim() !== "") {
        stacks[i].push(box.join("").trim());
      }
      i++;
    }
  }
  return stacks;
}

// Returns [quantity, startStack, endStack]
function getActions(rows: string[]): number[][] {
  const digits: number[][] = [];
  for (const row of rows) {
    if (row) {
      digits.push(
        row
          .replace(/[\D]/g, " ")
          .trimStart()
          .replace(/\s+/g, ",")
          .split(",")
          .map((x, i) => {
            if (i === 0) {
              return parseInt(x);
            } else {
              return parseInt(x) - 1;
            }
          }),
      );
    }
  }
  return digits;
}

export function moveThoseBoxes(stacks: string[][], actions: number[]) {
  const [quantity, start, end] = actions;
  for (let i = 0; i < quantity; i++) {
    const temp = stacks[start].shift();
    temp && stacks[end].unshift(temp);
  }
  return stacks;
}

export function moveThoseBoxesPart2(stacks: string[][], actions: number[]) {
  const [quantity, start, end] = actions;
  stacks[end] = [...stacks[start].splice(0, quantity), ...stacks[end]];
  return stacks;
}

function getAllTopItems(stacks: string[][]): string {
  return stacks
    .reduce((prev, next) => {
      return [...prev, next[0]];
    })
    .join("")
    .replace(/[[\]]/g, "");
}

solution();
