const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LOSE = 0;
const DRAW = 3;
const WIN = 6;

function getScore(opponentPlay: string, responsePlay: string): number {
  if (opponentPlay === "A") {
    if (responsePlay === "X") {
      return LOSE + SCISSORS;
    } else if (responsePlay === "Y") {
      return DRAW + ROCK;
    } else if (responsePlay === "Z") {
      return WIN + PAPER;
    }
  } else if (opponentPlay === "B") {
    if (responsePlay === "X") {
      return LOSE + ROCK;
    } else if (responsePlay === "Y") {
      return DRAW + PAPER;
    } else if (responsePlay === "Z") {
      return WIN + SCISSORS;
    }
  } else if (opponentPlay === "C") {
    if (responsePlay === "X") {
      return LOSE + PAPER;
    } else if (responsePlay === "Y") {
      return DRAW + SCISSORS;
    } else if (responsePlay === "Z") {
      return WIN + ROCK;
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
