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
        const heightDiff = highestY - prevHighest;
        const indexDiff = rockIndex - prevRockIndex;
        prevHighest = highestY;
        prevRockIndex = rockIndex;
        console.info(
          "i:",
          rockIndex,
          "indexDiff:",
          indexDiff,
          "heightDiff:",
          heightDiff,
          "height:",
          highestY,
        );
      }

      const gasJet: string = gasJets[gasJetIndex++];
      shape.tryMoveSideways(shapes, gasJet);
      falling = shape.tryMoveDown(shapes);
    }

    highestY = Math.max(highestY, shape.highestY + 1);
    shapes.push(shape);
  }

  return highestY;
}

console.info(solve(input));

/**
 *
======
$ deno run -A b.ts
i: 1739 indexDiff: 1739 heightDiff: 2754 height: 2754
i: 3484 indexDiff: 1745 heightDiff: 2767 height: 5521
i: 5229 indexDiff: 1745 heightDiff: 2767 height: 8288
i: 6974 indexDiff: 1745 heightDiff: 2767 height: 11055
i: 8719 indexDiff: 1745 heightDiff: 2767 height: 13822
i: 10464 indexDiff: 1745 heightDiff: 2767 height: 16589
======

First time -> After 1739 rocks and a height of 2754, a pattern is created:
  -> every 1745 rocks, increase by 2754

To get height after 1000000000000th rock:

(1000000000000 - 1739) * (2767/1745) + 2654
= 1585673352332
 */
