const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

/**
 * A -> Rock
 * B -> Paper
 * C -> Scissors
 */

/**
 * X -> Lose 0, Rock 1
 * Y -> Draw 3, Paper, 2
 * Z -> Win 6, Scissors, 3
 */

let score = 0;

function getScore(opponentPlay: string, responsePlay: string): number {
  if (opponentPlay === "A") {
    if (responsePlay === "X") {
      return 0 + 3;
    } else if (responsePlay === "Y") {
      return 3 + 1;
    } else if (responsePlay === "Z") {
      return 6 + 2;
    } else {
      throw new Error("Unknown response play: " + responsePlay);
    }
  } else if (opponentPlay === "B") {
    if (responsePlay === "X") {
      return 0 + 1;
    } else if (responsePlay === "Y") {
      return 3 + 2;
    } else if (responsePlay === "Z") {
      return 6 + 3;
    } else {
      throw new Error("Unknown response play: " + responsePlay);
    }
  } else if (opponentPlay === "C") {
    if (responsePlay === "X") {
      return 0 + 2;
    } else if (responsePlay === "Y") {
      return 3 + 3;
    } else if (responsePlay === "Z") {
      return 6 + 1;
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
