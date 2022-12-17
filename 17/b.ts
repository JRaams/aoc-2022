import { CreateShape, Shape } from "./shape.ts";

const line: string = await Deno.readTextFile("./input.txt");
const input: string = line.split("\n")[0];

function solve(gasJets: string): number {
  let gasJetIndex = 0;
  let highestY = 0;
  const shapes: Shape[] = [];

  let prevHighest = 0;
  let prevRockIndex = 0;

  for (let rockIndex = 0; rockIndex < 1000000000; rockIndex++) {
    const shape = CreateShape(rockIndex, highestY + 3);

    let falling = true;
    while (falling) {
      if (gasJetIndex >= gasJets.length) {
        gasJetIndex = 0;
      }

      const gasJet: string = gasJets[gasJetIndex++];
      shape.tryMoveSideways(shapes, gasJet);
      falling = shape.tryMoveDown(shapes);

      if (gasJetIndex === 1) {
        const heightDiff = highestY - prevHighest;
        const indexDiff = rockIndex - prevRockIndex;
        prevHighest = highestY;
        prevRockIndex = rockIndex;
        console.info(
          "i:",
          rockIndex,
          "heightDiff:",
          heightDiff,
          "indexDiff:",
          indexDiff,
          "height:",
          highestY,
        );
      }
    }

    highestY = Math.max(highestY, shape.highestY + 1);
    shapes.push(shape);
  }

  return highestY;
}

console.info(solve(input));

/**
 * $ deno run -A b.ts
i: 0 heightDiff: 0 indexDiff: 0 height: 0
i: 1739 heightDiff: 2754 indexDiff: 1739 height: 2754
i: 3484 heightDiff: 2767 indexDiff: 1745 height: 5521
i: 5229 heightDiff: 2767 indexDiff: 1745 height: 8288
i: 6974 heightDiff: 2767 indexDiff: 1745 height: 11055
i: 8719 heightDiff: 2767 indexDiff: 1745 height: 13822
i: 10464 heightDiff: 2767 indexDiff: 1745 height: 16589
i: 12209 heightDiff: 2767 indexDiff: 1745 height: 19356
i: 13954 heightDiff: 2767 indexDiff: 1745 height: 22123
i: 15699 heightDiff: 2767 indexDiff: 1745 height: 24890
...

(1000000000000 - 1739) * (2767/1745) + 2654
= 1585673352332
 */
