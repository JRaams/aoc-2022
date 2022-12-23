const lines: string = await Deno.readTextFile("./input.txt");
const input: number[] = lines.split("\n").filter((l) => l).map(Number);

