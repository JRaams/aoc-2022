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
