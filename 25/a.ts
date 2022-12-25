const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

const digitLookup: Record<string, number> = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2,
};
const snafuLookup: Record<number, string> = {
  "2": "2",
  "1": "1",
  "0": "0",
  "-1": "-",
  "-2": "=",
};

export function toBase10(base5: string): number {
  const digits = base5.split("");
  let num = 0;

  for (let i = digits.length - 1; i >= 0; i--) {
    const scalar = 5 ** (digits.length - i - 1);
    const value = digitLookup[digits[i]];
    num += scalar * value;
  }

  return num;
}

export function toBase5(decimal: number): string {
  let largestDigit = 0;
  while (true) {
    const scalar = 5 ** largestDigit;
    if (2 * scalar >= decimal) break;
    largestDigit++;
  }

  let str = "";
  let constructed = 0;

  for (let i = largestDigit; i >= 0; i--) {
    let progress = -2;
    [-2, -1, 0, 1, 2].forEach((s) => {
      const scalar = 5 ** i * s;
      const dist = Math.abs(decimal - constructed - scalar);
      const prevDist = Math.abs(decimal - constructed - 5 ** i * progress);
      if (dist <= prevDist) {
        progress = s;
      }
    });

    constructed += 5 ** i * progress;
    str += snafuLookup[progress];
  }

  return str.replace(/^0+/, "");
}

export function solve(i: string[]): string {
  const numbers = i.map(toBase10);
  const decimalSum = numbers.reduce((p, c) => p + c, 0);
  const SNAFU = toBase5(decimalSum);
  return SNAFU;
}

console.info(solve(input));
