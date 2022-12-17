import { Chamber, CreateShape } from "./shape.ts";

const line: string = await Deno.readTextFile("./input.txt");
const input: string = line.split("\n")[0];

function solve(gasJets: string): number {
  let gasJetIndex = 0;

  const chamber: Chamber = {
    currentShape: undefined,
    shapes: [],
    highestY: -1,
  };

  for (let rockIndex = 0; rockIndex < 2022; rockIndex++) {
    const shape = CreateShape(rockIndex, chamber.highestY + 4);
    chamber.currentShape = shape;

    let falling = true;
    while (falling) {
      const gasJet: string = gasJets[gasJetIndex++ % gasJets.length];
      shape.tryMoveSideways(chamber.shapes, gasJet);
      falling = shape.tryMoveDown(chamber.shapes);
    }

    chamber.highestY = Math.max(chamber.highestY, shape.highestY);
    chamber.shapes.push(shape);
  }

  return chamber.highestY + 1;
}

console.info(solve(input));
