const dirs = ["north", "south", "west", "east"];
const offsets: Record<string, Pos[]> = {
  "north": [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
  "south": [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
  "west": [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }],
  "east": [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }],
};
type PosMap = Record<number, Record<number, Elf>>;

interface Pos {
  x: number;
  y: number;
}

class Elf {
  x: number;
  y: number;
  next?: Pos;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private isClear(elves: PosMap): boolean {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) continue;
        if (elves[this.y + dy] === undefined) continue;
        if (elves[this.y + dy][this.x + dx] !== undefined) {
          return false;
        }
      }
    }

    return true;
  }

  public tryMove(elves: PosMap, dirIndex: number): Pos | undefined {
    if (this.isClear(elves)) return;

    for (let i = 0; i < 4; i++) {
      const dir = dirs[(i + dirIndex) % 4];

      const deltas = offsets[dir];
      const isFree = deltas.every((delta) =>
        !elves[this.y + delta.y] ||
        elves[this.y + delta.y][this.x + delta.x] === undefined
      );
      if (isFree) {
        this.next = { x: this.x + deltas[1].x, y: this.y + deltas[1].y };
        return { x: this.x + deltas[1].x, y: this.y + deltas[1].y };
      }
    }
  }
}

export class State {
  elves: Elf[];
  posMap: PosMap;
  dirIndex = 0;

  constructor(elves: Elf[], posMap: PosMap) {
    this.elves = elves;
    this.posMap = posMap;
  }

  public doRound(): boolean {
    // { y: { x: count }}
    const nextPos: Record<number, Record<number, number>> = {};

    // First half, propose moves
    this.elves.forEach((e) => {
      e.next = undefined;
      const potentialPos = e.tryMove(this.posMap, this.dirIndex);
      if (!potentialPos) return;
      const { x, y } = potentialPos;
      if (nextPos[y] === undefined) {
        nextPos[y] = {};
      }
      if (nextPos[y][x] === undefined) {
        nextPos[y][x] = 0;
      }
      nextPos[y][x]++;
    });

    // Second half, perform moves
    let moves = 0;
    this.elves.forEach((e) => {
      if (!e.next) return;
      const next = e.next;
      // If two or more Elves propose moving to the same position, none of those Elves move.
      if (nextPos[next.y][next.x] > 1) return;

      delete this.posMap[e.y][e.x];
      if (this.posMap[next.y] === undefined) {
        this.posMap[next.y] = {};
      }
      this.posMap[next.y][next.x] = e;
      e.x = next.x;
      e.y = next.y;
      e.next = undefined;
      moves++;
    });

    // No elves need to move, process ends
    if (moves === 0) {
      return false;
    }

    this.dirIndex++;
    this.dirIndex %= 4;
    return true;
  }
}

export function loadState(): State {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const input: string[][] = lines.split("\n").filter((l) => l).map((l) =>
    l.split("")
  );

  const elves: Elf[] = [];
  const posMap: PosMap = {};
  for (let y = 0; y < input.length; y++) {
    posMap[y] = {};
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === ".") continue;
      const elf = new Elf(x, y);
      elves.push(elf);
      posMap[y][x] = elf;
    }
  }

  const state = new State(elves, posMap);
  state.posMap = posMap;
  return state;
}
