const lines: string = await Deno.readTextFile("./input.txt");
const [cratesStr, procedureStr] = lines.split("\n\n");

export function loadCrates(cratesStr: string): string[][] {
  const crates: string[][] = [];

  // Load stacks of crates
  const lines = cratesStr.split("\n");
  lines[lines.length - 1].split("  ").map((s) => Number(s.trim())).forEach(() =>
    crates.push([])
  );

  // Fill each crate from the bottom up
  for (let i = lines.length - 2; i >= 0; i--) {
    const chars: string[] = [];
    const line = lines[i];
    for (let k = 1; k < line.length; k += 4) {
      const char = line[k];
      chars.push(char);
    }

    for (let j = 0; j < chars.length; j++) {
      const char = chars[j];
      if (char === " ") continue;
      crates[j].push(char);
    }
  }

  return crates;
}

export function solve(crates: string[][], procedure: string): string {
  procedure.split("\n").forEach((line) => {
    const [count, from, to] = line.split(" ").filter((s) => !isNaN(s)).map(
      Number,
    );

    for (let i = 0; i < count; i++) {
      const crate = crates[from - 1].pop();
      if (crate === undefined) {
        throw new Error("ree");
      }
      crates[to - 1].push(crate);
    }
  });

  return crates.reduce(
    (prev: string, curr: string[]) => prev + curr[curr.length - 1],
    "",
  );
}

const crates = loadCrates(cratesStr);

console.info(solve(crates, procedureStr));
