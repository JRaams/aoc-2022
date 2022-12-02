const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LOSE = 0;
const DRAW = 3;
const WIN = 6;

export function getScore(opponentPlay: string, responsePlay: string): number {
  if (opponentPlay === "A") {
    if (responsePlay === "X") {
      return ROCK + DRAW;
    } else if (responsePlay === "Y") {
      return PAPER + WIN;
    } else if (responsePlay === "Z") {
      return SCISSORS + LOSE;
    }
  } else if (opponentPlay === "B") {
    if (responsePlay === "X") {
      return ROCK + LOSE;
    } else if (responsePlay === "Y") {
      return PAPER + DRAW;
    } else if (responsePlay === "Z") {
      return SCISSORS + WIN;
    }
  } else if (opponentPlay === "C") {
    if (responsePlay === "X") {
      return ROCK + WIN;
    } else if (responsePlay === "Y") {
      return PAPER + LOSE;
    } else if (responsePlay === "Z") {
      return SCISSORS + DRAW;
    }
  }

  return 0;
}

let score = 0;

input.forEach((line: string) => {
  const [opponentPlay, responsePlay] = line.split(" ");

  score += getScore(opponentPlay, responsePlay);
});

console.info(score);
