type NumOrBigInt = number | bigint;

/* Helper to run mutliple search-and-replace 
*/



export function replaceAll(body: string, replacements: { [search: string]: string }, global = true) {
  let current = body;
  for (const entry of Object.entries(replacements)) {
    if (global) {
      current = current.split(entry[0]).join(entry[1])
    } else {
      current = current.replace(entry[0], entry[1]);
    }
  }
  return current
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

// Modulus

export function bigIntMod(_a: number | bigint, _n: number | bigint) {
  const [a, n] = [_a, _n].map(BigInt);
  return ((a % n) + n) % n;
}

export function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}


// Greatest Common Denominator
export function gcd(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);

  if (b > a) {
    var temp = a;
    a = b;
    b = temp
  }

  while (true) {
    a %= b;
    if (a === 0) {
      return b;
    }
    b %= a;
    if (b === 0) {
      return a
    }
  }
}

export function gcdExtended(_a: NumOrBigInt, _b: NumOrBigInt) {
  let [a, b] = [_a, _b].map(BigInt);
  let x = 0n,
    y = 1n,
    u = 1n,
    v = 0n;
  while (a !== 0n) {
    let q = b / a;
    [x, y, u, v] = [u, v, x - u * q, y - v * q];
    [a, b] = [b % a, a];
  }
  return [b, x, y];
}


// Lowest Common Multiple
export function lcm(nums: bigint[]) {
  return nums.reduce((p, c) => (p * c) / BigInt(gcd(Number(p), Number(c))), 1n);
}


/** 
* modular multiplicative inverse
* */
export function modInverse(_a: NumOrBigInt, _m: NumOrBigInt) {
  const [a, m] = [_a, _m].map(BigInt);
  const [g, x] = gcdExtended(a, m);
  if (g !== 1n) throw 'Mod inverse error';
  return (x + m) % m;
}

export function modDivide(_a: NumOrBigInt, _b: NumOrBigInt, _m: NumOrBigInt) {
  const [a, b, m] = [_a, _b, _m].map(BigInt);
  return (a * modInverse(b, m)) % m;
}

export function powerMod(_base: NumOrBigInt, _expo: NumOrBigInt, _mod: NumOrBigInt) {
  let [base, exponent, modulus] = [_base, _expo, _mod].map(BigInt);
  if (modulus === 1n) return 0n;
  let result = 1n;

  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent >> 1n;
    base = (base * base) % modulus
  }
  return result;
}

export function getPermutations<T>(inputArr: T[]) {
  const result: T[][] = [];

  function permute(arr: T[], m: T[] = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; ++i) {
        const current = arr.slice();
        const next = current.splice(i, 1);
        permute(current.slice(), m.concat(next));
      }
    }
  }

  permute(inputArr);
  return result;
}


export function powerSet<T>(inputArray: T[], settings: {
  proper?: boolean; nonEmpty?: boolean
} = {}) {
  let result = inputArray.reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [
    [],
  ] as T[][]);
  if (settings.proper) {
    result = result.filter(a => a.length !== inputArray.length);
  }
  if (settings.nonEmpty) {
    result = result.filter(a => a.length !== 0)
  }
  return result
}


// Count of each unique in arr
export function countUnique(iterable: Iterable<string>): {
  [element: string]: number;
} {
  const result: { [element: string]: number } = {};
  for (const element of iterable) {
    if (!result[element]) {
      result[element] = 1;
    } else {
      result[element]++;
    }
  }
  return result;
}


// Find max value in an arr
export function max<T>(array: T[], toNum: (element: T) => number = Number) {
  let maxIndex = -1;
  let maxValue = Number.MIN_VALUE;
  let maxElement: T | undefined = undefined;

  for (let i = 0; i < array.length; i++) {
    const num = toNum(array[i]);
    if (num > maxValue) {
      maxIndex = i;
      maxValue = num;
      maxElement = array[i]
    }
  }
  return { index: maxIndex, value: maxValue, element: maxElement }
}

// find min value in arr
export function min<T>(array: T[], toNum: (element: T) => number = Number) {
  let minIndex = -1;
  let minValue = Number.MAX_VALUE;
  let minElement: T | undefined = undefined;

  for (let i = 0; i < array.length; i++) {
    const num = toNum(array[i]);
    if (num < minValue) {
      minIndex = i;
      minValue = num;
      minElement = array[i]
    }
  }
  return { index: minIndex, value: minValue, element: minElement }
}


export function formatToArray(input: string){
  const lines = input.split("\n");
  // Remove trailing empty line
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}