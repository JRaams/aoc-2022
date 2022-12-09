export interface Motion {
  dir: string;
  steps: number;
}

export interface Pos {
  x: number;
  y: number;
}

export function moveTail(tail: Pos, head: Pos): void {
  const d = dist(tail, head);
  if (d < 2) return;

  let dx = head.x - tail.x;
  dx = dx !== 0 ? dx > 0 ? 1 : -1 : 0;
  let dy = head.y - tail.y;
  dy = dy !== 0 ? dy > 0 ? 1 : -1 : 0;

  tail.x += dx;
  tail.y += dy;
}

function dist(a: Pos, b: Pos): number {
  return Math.floor(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}
