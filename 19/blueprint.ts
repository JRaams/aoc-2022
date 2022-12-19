export interface Blueprint {
  index: number;
  oreRobotCost: number;
  clayRobotCost: number;
  obsidianRobotOreCost: number;
  obsidianRobotClayCost: number;
  geodeRobotOreCost: number;
  geodeRobotObsidianCost: number;
}

const REGEX = /([a-zA-Z ]+(\d+))/g;

export function loadInput(): Blueprint[] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const input: string[] = lines.split("\n").filter((l) => l);
  const blueprints: Blueprint[] = [];

  input.forEach((line) => {
    const _ = [...line.matchAll(REGEX)].map((l) => Number(l[2]));

    blueprints.push({
      index: _[0],
      oreRobotCost: _[1],
      clayRobotCost: _[2],
      obsidianRobotOreCost: _[3],
      obsidianRobotClayCost: _[4],
      geodeRobotOreCost: _[5],
      geodeRobotObsidianCost: _[6],
    });
  });

  return blueprints;
}
