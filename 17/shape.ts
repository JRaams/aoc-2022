export interface Pos {
  x: number;
  y: number;
}

export abstract class Shape {
  index: number;
  units: Pos[];

  constructor(index: number, x: number, y: number, units: Pos[]) {
    this.index = index;

    units.forEach((unit) => {
      unit.x += x;
      unit.y += y;
    });

    this.units = units;
  }

  collides(unit: Pos): boolean {
    for (let i = 0; i < this.units.length; i++) {
      const ownUnit = this.units[i];

      if (ownUnit.x === unit.x && ownUnit.y === unit.y) {
        return true;
      }
    }

    return false;
  }

  get highestY(): number {
    return this.units.sort((a, b) => a.y > b.y ? -1 : 1)[0].y;
  }

  tryMoveSideways(shapes: Shape[], direction: string): void {
    const dx = direction === ">" ? 1 : -1;

    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i];
      const newX = unit.x + dx;
      if (newX < 0 || newX >= 7) {
        return;
      }

      for (let j = 0; j < shapes.length; j++) {
        if (shapes[j].collides({ x: unit.x + dx, y: unit.y })) {
          return;
        }
      }
    }

    this.units.forEach((unit) => {
      unit.x += dx;
    });
  }

  tryMoveDown(shapes: Shape[]): boolean {
    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i];
      const newY = unit.y - 1;
      if (newY < 0) {
        return false;
      }

      for (let j = 0; j < shapes.length; j++) {
        if (shapes[j].collides({ x: unit.x, y: unit.y - 1 })) {
          return false;
        }
      }
    }

    this.units.forEach((unit) => {
      unit.y -= 1;
    });
    return true;
  }
}

/**
 * |..@@@@.|
 */
export class HorizontalLine extends Shape {
  constructor(index: number, y: number) {
    super(index, 2, y, [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  }
}

/**
 * |...@...|
 * |..@@@..|
 * |...@...|
 */
export class Plus extends Shape {
  constructor(index: number, y: number) {
    super(index, 2, y, [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ]);
  }
}

/**
 * |....#..|
 * |....#..|
 * |..###..|
 */
export class ReverseL extends Shape {
  constructor(index: number, y: number) {
    super(index, 2, y, [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  }
}

/**
 * |..#....|
 * |..#....|
 * |..#....|
 * |..#....|
 */
export class VerticalLine extends Shape {
  constructor(index: number, y: number) {
    super(index, 2, y, [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ]);
  }
}

/**
 * |..##...|
 * |..##...|
 */
export class Block extends Shape {
  constructor(index: number, y: number) {
    super(index, 2, y, [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  }
}

const shapes = [HorizontalLine, Plus, ReverseL, VerticalLine, Block];
export function CreateShape(index: number, y: number): Shape {
  return new shapes[index % shapes.length](index, y);
}
