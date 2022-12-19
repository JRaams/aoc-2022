import { Blueprint } from "./blueprint.ts";
import { Inventory } from "./inventory.ts";

function timeUntilNextRobot(needed: number, got: number, robots: number) {
  return got >= needed
    ? 1
    : 1 + Math.floor((needed - got + robots - 1) / robots);
}

export function maxGeodeCount(
  blueprint: Blueprint,
  time: number,
  inv: Inventory,
): number {
  if (time <= 0) return -1;

  const {
    ore,
    oreRobots,
    clay,
    clayRobots,
    obsidian,
    obsidianRobots,
    geode,
    geodeRobots,
  } = inv;

  // Define baseline: total geodes we would get if we do nothing
  let best: number = geode + time * geodeRobots;

  // For each type of robot, check if enough material of that type is being produced to stop making these robots
  // If not, create a new robot of that type, else create one at the next possibility
  if (
    oreRobots < blueprint.clayRobotCost ||
    oreRobots < blueprint.obsidianRobotOreCost ||
    oreRobots < blueprint.geodeRobotOreCost
  ) {
    const dt: number = timeUntilNextRobot(
      blueprint.oreRobotCost,
      ore,
      oreRobots,
    );
    if (time > dt) {
      const i2 = inv.clone();
      i2.mine(dt);
      i2.construct(blueprint, "ore");
      best = Math.max(best, maxGeodeCount(blueprint, time - dt, i2));
    }
  }
  if (clayRobots < blueprint.obsidianRobotClayCost) {
    const dt: number = timeUntilNextRobot(
      blueprint.clayRobotCost,
      ore,
      oreRobots,
    );
    if (time > dt) {
      const i2 = inv.clone();
      i2.mine(dt);
      i2.construct(blueprint, "clay");
      best = Math.max(best, maxGeodeCount(blueprint, time - dt, i2));
    }
  }
  if (clayRobots > 0 && obsidianRobots < blueprint.geodeRobotObsidianCost) {
    const dt: number = Math.max(
      timeUntilNextRobot(blueprint.obsidianRobotOreCost, ore, oreRobots),
      timeUntilNextRobot(blueprint.obsidianRobotClayCost, clay, clayRobots),
    );
    if (time > dt) {
      const i2 = inv.clone();
      i2.mine(dt);
      i2.construct(blueprint, "obsidian");
      best = Math.max(best, maxGeodeCount(blueprint, time - dt, i2));
    }
  }
  if (obsidianRobots > 0) {
    const dt: number = Math.max(
      timeUntilNextRobot(blueprint.geodeRobotOreCost, ore, oreRobots),
      timeUntilNextRobot(
        blueprint.geodeRobotObsidianCost,
        obsidian,
        obsidianRobots,
      ),
    );
    if (time > dt) {
      const i2 = inv.clone();
      i2.mine(dt);
      i2.construct(blueprint, "geode");
      best = Math.max(best, maxGeodeCount(blueprint, time - dt, i2));
    }
  }

  return best;
}
