const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

/**
 * A -> Rock
 * B -> Paper
 * C -> Scissors
 */

/**
 * X -> Rock
 * Y -> Paper
 * Z -> Scissors
 */

let score = 0;

function getScore(opponentPlay: string, responsePlay: string): number {
  if (opponentPlay === "A") {
    if (responsePlay === "X") {
      return 1 + 3;
    } else if (responsePlay === "Y") {
      return 2 + 6;
    } else if (responsePlay === "Z") {
      return 3 + 0;
    } else {
      throw new Error("Unknown response play: " + responsePlay);
    }
  } else if (opponentPlay === "B") {
    if (responsePlay === "X") {
      return 1 + 0;
    } else if (responsePlay === "Y") {
      return 2 + 3;
    } else if (responsePlay === "Z") {
      return 3 + 6;
    } else {
      throw new Error("Unknown response play: " + responsePlay);
    }
  } else if (opponentPlay === "C") {
    if (responsePlay === "X") {
      return 1 + 6;
    } else if (responsePlay === "Y") {
      return 2 + 0;
    } else if (responsePlay === "Z") {
      return 3 + 3;
    } else {
      throw new Error("Unknown response play: " + responsePlay);
    }
  } else {
    throw new Error("Unknown opponent play: " + opponentPlay);
  }
}

input.forEach((line: string) => {
  const [opponentPlay, responsePlay] = line.split(" ");

  score += getScore(opponentPlay, responsePlay);
});

console.info(score);
