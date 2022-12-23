import { loadState, State } from "./elf.ts";

function solve(): number {
  const state: State = loadState();

  let round = 1;
  while (true) {
    if (!state.doRound()) {
      return round;
    }
    round++;
  }
}

console.info(solve());
