import * as fs from 'fs';
import { formatToArray } from '../utils/util';

function containsOtherArray(a: number[], b: number[]){
      const [a1, a2] = a
      const [b1, b2] = b
      return (a1 >= b1) && (a2 <= b2);
}

function overlaps(a: number[], b: number[]){
  const [a1,a2] = a
  const [b1, b2] = b
  return (a1 <= b2) && (b1 <= a2);
}

function part1() {  
  const lines = formatToArray(fs.readFileSync('src/day4/input.txt', 'utf-8'))
  const arr = lines.map((line)=> {
    const [a, b, c, d] = line.split(/[-,]/);
    return [[parseInt(a),parseInt(b)], [parseInt(c),parseInt(d)]];
  })
  console.log(arr.filter(([a, b]) =>
    containsOtherArray(a, b) || containsOtherArray(b,a)
  ).length)

  console.log(arr.filter(([a, b]) =>
    overlaps(a, b) || overlaps(b,a)
  ).length)
}

part1()
