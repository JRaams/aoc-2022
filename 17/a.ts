import { CreateShape, Shape } from "./shape.ts";

const line: string = await Deno.readTextFile("./input.txt");
const input: string = line.split("\n")[0];

function solve(gasJets: string): number {
  let gasJetIndex = 0;
  let highestY = 0;
  const shapes: Shape[] = [];

  for (let rockIndex = 0; rockIndex < 2022; rockIndex++) {
    const shape = CreateShape(rockIndex, highestY + 3);

    let falling = true;
    while (falling) {
      const gasJet: string = gasJets[gasJetIndex++ % gasJets.length];
      shape.tryMoveSideways(shapes, gasJet);
      falling = shape.tryMoveDown(shapes);
    }

    highestY = Math.max(highestY, shape.highestY + 1);
    shapes.push(shape);
  }

  return highestY;
}

console.info(solve(input));
