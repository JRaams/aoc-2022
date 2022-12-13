const lines: string = await Deno.readTextFile("./input.txt");
const input: Val[] = lines.split("\n").filter((l) => l).map((l) =>
  JSON.parse(l)
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

function solve(i: Val[]): number {
  i.push([[[2]]]);
  i.push([[[6]]]);

  i.sort(compare);

  const a = 1 +
    i.findIndex((x) => JSON.stringify(x) === JSON.stringify([[[2]]]));
  const b = 1 +
    i.findIndex((x) => JSON.stringify(x) === JSON.stringify([[[6]]]));

  return a * b;
}

console.info(solve(input));
