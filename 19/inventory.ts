import { Blueprint } from "./blueprint.ts";

export class Inventory {
  ore: number;
  oreRobots: number;
  clay: number;
  clayRobots: number;
  obsidian: number;
  obsidianRobots: number;
  geode: number;
  geodeRobots: number;

  constructor() {
    this.ore = 0;
    this.oreRobots = 1;
    this.clay = 0;
    this.clayRobots = 0;
    this.obsidian = 0;
    this.obsidianRobots = 0;
    this.geode = 0;
    this.geodeRobots = 0;
  }

  public mine(dt: number): void {
    this.ore += this.oreRobots * dt;
    this.clay += this.clayRobots * dt;
    this.obsidian += this.obsidianRobots * dt;
    this.geode += this.geodeRobots * dt;
  }

  public clone(): Inventory {
    const newInv = new Inventory();
    newInv.ore = this.ore;
    newInv.oreRobots = this.oreRobots;
    newInv.clay = this.clay;
    newInv.clayRobots = this.clayRobots;
    newInv.obsidian = this.obsidian;
    newInv.obsidianRobots = this.obsidianRobots;
    newInv.geode = this.geode;
    newInv.geodeRobots = this.geodeRobots;
    return newInv;
  }

  public construct(
    b: Blueprint,
    type: "ore" | "clay" | "obsidian" | "geode",
  ): void {
    switch (type) {
      case "ore": {
        this.oreRobots++;
        this.ore -= b.oreRobotCost;
        break;
      }
      case "clay": {
        this.clayRobots++;
        this.ore -= b.clayRobotCost;
        break;
      }
      case "obsidian": {
        this.obsidianRobots++;
        this.ore -= b.obsidianRobotOreCost;
        this.clay -= b.obsidianRobotClayCost;
        break;
      }
      case "geode": {
        this.geodeRobots++;
        this.ore -= b.geodeRobotOreCost;
        this.obsidian -= b.geodeRobotObsidianCost;
        break;
      }
    }
  }
}

function timeUntilNextRobot(needed: number, got: number, robots: number) {
  return got >= needed
    ? 1
    : 1 + Math.floor((needed - got + robots - 1) / robots);
}

export function maxGeodeCount(
  b: Blueprint,
  currentMinute: number,
  inventory: Inventory,
): number {
  if (currentMinute <= 0) return -1;

  const {
    ore,
    oreRobots,
    clay,
    clayRobots,
    obsidian,
    obsidianRobots,
    geode,
    geodeRobots,
  } = inventory;

  // Define baseline: total geodes we would get if we do nothing
  let best: number = geode + currentMinute * geodeRobots;

  // For each type of robot, check if enough material of that type is being produced to stop making these robots
  // If not, create a new robot of that type, else create one at the next possibility
  if (
    oreRobots < b.clayRobotCost || oreRobots < b.obsidianRobotOreCost ||
    oreRobots < b.geodeRobotOreCost
  ) {
    const dt: number = timeUntilNextRobot(b.oreRobotCost, ore, oreRobots);
    if (currentMinute > dt) {
      const i2 = inventory.clone();
      i2.mine(dt);
      i2.construct(b, "ore");
      best = Math.max(best, maxGeodeCount(b, currentMinute - dt, i2));
    }
  }
  if (clayRobots < b.obsidianRobotClayCost) {
    const dt: number = timeUntilNextRobot(b.clayRobotCost, ore, oreRobots);
    if (currentMinute > dt) {
      const i2 = inventory.clone();
      i2.mine(dt);
      i2.construct(b, "clay");
      best = Math.max(best, maxGeodeCount(b, currentMinute - dt, i2));
    }
  }
  if (clayRobots > 0 && obsidianRobots < b.geodeRobotObsidianCost) {
    const dt: number = Math.max(
      timeUntilNextRobot(b.obsidianRobotOreCost, ore, oreRobots),
      timeUntilNextRobot(b.obsidianRobotClayCost, clay, clayRobots),
    );
    if (currentMinute > dt) {
      const i2 = inventory.clone();
      i2.mine(dt);
      i2.construct(b, "obsidian");
      best = Math.max(best, maxGeodeCount(b, currentMinute - dt, i2));
    }
  }
  if (obsidianRobots > 0) {
    const dt: number = Math.max(
      timeUntilNextRobot(b.geodeRobotOreCost, ore, oreRobots),
      timeUntilNextRobot(b.geodeRobotObsidianCost, obsidian, obsidianRobots),
    );
    if (currentMinute > dt) {
      const i2 = inventory.clone();
      i2.mine(dt);
      i2.construct(b, "geode");
      best = Math.max(best, maxGeodeCount(b, currentMinute - dt, i2));
    }
  }

  return best;
}
