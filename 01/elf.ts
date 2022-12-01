export function loadElves(lines: string[]): number[] {
  const elves: number[] = [];
  let currentElf = 0;

  lines.forEach((line) => {
    if (line === "") {
      elves.push(currentElf);
      currentElf = 0;
      return;
    }

    currentElf += Number(line);
  });

  return elves;
}
