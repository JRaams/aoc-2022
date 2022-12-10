const line: string = await Deno.readTextFile("./input.txt");
const input: string[] = line.replaceAll("addx", "noop\naddx")
  .split("\n").filter((l) => l);

export function solve(i: string[]): void {
  let X = 1;
  const pixels: string[] = [];

  i.forEach((line, index) => {
    const indexInRow = index % 40;
    const shouldDrawPixel = Math.abs(indexInRow - X) <= 1;
    pixels.push(shouldDrawPixel ? "#" : " ");

    const [instruction, valueStr] = line.split(" ");
    if (instruction === "addx") {
      X += Number(valueStr);
    }
  });

  for (let i = 0; i < 6; i++) {
    console.info(pixels.slice(40 * i, 40 * i + 40).join(""));
  }
}

solve(input);
