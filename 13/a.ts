const lines: string = await Deno.readTextFile("./input.txt");
const input: [Val, Val][] = lines.split("\n\n").map((l) =>
  l.split("\n").filter((l) => l).map((l) => JSON.parse(l))
);

export const FALSE = -1;
export const SKIP = 0;
export const TRUE = 1;
export type Val = number | Val[];

export function compare(left: Val, right: Val): number {
  if (typeof (left) === "number" && typeof (right) === "number") {
    return Math.sign(left - right);
  }

  if (typeof (left) === "object" && typeof (right) === "object") {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      if (left[i] === undefined) return FALSE;
      if (right[i] === undefined) return TRUE;

      const ans = compare(left[i], right[i]);
      if (ans !== 0) return ans;
    }

    if (left.length < right.length) return TRUE;
    if (right.length > left.length) return FALSE;
    return 0;
  }

  if (typeof (left) === "number") {
    return compare([left], right);
  } else {
    return compare(left, [right]);
  }
}

function solve(i: [Val, Val][]): number {
  let indexSum = 0;

  i.forEach(([left, right], index) => {
    if (compare(left, right) === FALSE) {
      indexSum += index + 1;
    }
  });

  return indexSum;
}

console.info(solve(input));
