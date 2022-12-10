const line: string = await Deno.readTextFile("./input.txt");
const input: string[] = line.replaceAll("addx", "noop\naddx")
  .split("\n").filter((l) => l);

export function solve(i: string[]): number {
  let X = 1;
  let signalStrengthSum = 0;

  i.forEach((line, index) => {
    if ((index + 1) % 40 === 20) {
      signalStrengthSum += (index + 1) * X;
    }

    const [instruction, valueStr] = line.split(" ");
    if (instruction === "addx") {
      X += Number(valueStr);
    }
  });

  return signalStrengthSum;
}

console.info(solve(input));
