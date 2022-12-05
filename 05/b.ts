const lines: string = await Deno.readTextFile("./input.txt");
const [cratesStr, procedureStr] = lines.split("\n\n");

export function loadCrates(cratesStr: string): string[][] {
  const crates: string[][] = [];

  // Create space (array) for each stack of crates
  const lines = cratesStr.split("\n");
  lines[lines.length - 1].split("  ").map((s) => Number(s.trim())).forEach(() =>
    crates.push([])
  );

  // Fill each crate from the bottom up
  for (let i = lines.length - 2; i >= 0; i--) {
    const line = lines[i];
    for (let k = 1; k < line.length; k += 4) {
      const char = line[k];
      if (char === " ") continue;

      const index = Math.floor((k - 1) / 4);
      crates[index].push(char);
    }
  }

  return crates;
}

export function solve(crates: string[][], procedure: string): string {
  procedure.split("\n").filter((l) => l).forEach((line) => {
    const [count, from, to] = line.split(" ").map(Number).filter((s) =>
      !isNaN(s)
    );

    const cratesToMove = crates[from - 1].splice(
      crates[from - 1].length - count,
      count,
    );
    crates[to - 1].push(...cratesToMove);
  });

  return crates.reduce(
    (prev: string, curr: string[]) => prev + curr[curr.length - 1],
    "",
  );
}

const crates = loadCrates(cratesStr);

console.info(solve(crates, procedureStr));
