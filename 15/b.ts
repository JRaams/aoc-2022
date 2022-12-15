// import { loadMap, Pos, Sensor } from "./beacon.ts";

// function isfree(sensors: Sensor[], pos: Pos): boolean {
//   return sensors.every((s) => {
//     const dist = Math.abs(s.x - pos.x) + Math.abs(s.y - pos.y);
//     return dist > s.radius;
//   });
// }

// export function solve(): number {
//   const map = loadMap();
//   const sensors = map.map((m) => m.sensor);

//   const LIMIT = 20;
//   const grid_size = 5;
//   const toReview = [];

//   for (let r = 0; r < LIMIT / grid_size; r++) {
//     const row = r * grid_size;

//     for (let i = 0; i < LIMIT / grid_size; i++) {
//       let isAllIn = false;
//       let ul: Pos = { x: grid_size * i, y: row };
//       let ur: Pos = { x: grid_size * i + grid_size, y: row };
//       let ll: Pos = { x: grid_size * i, y: row + grid_size };
//       let lr: Pos = { x: grid_size * i + grid_size, y: row + grid_size };
//       let corners = [ul, ur, ll, lr];

//       if (corners.every((corner) => isfree(sensors, corner))) {
//         isAllIn = true;
//         break;
//       }

//       if (!isAllIn) {
//         toReview.push(corners);
//       }
//     }
//   }

//   return -1;
// }

// console.info(solve());

// const LIMIT = 4000000;

// function add_bound(periphery: Pos[], x: number, y: number): void {
//   if (x >= 0 && x <= LIMIT && y >= 0 && y <= LIMIT) {
//     periphery.push({ x, y });
//   }
// }

// function periphery(sensor: Sensor): Pos[] {
//   const p: Pos[] = [];

//   for (let i = 0; i < sensor.radius + 2; i++) {
//     add_bound(p, sensor.x - sensor.radius - 1 + i, sensor.y - i);
//     add_bound(p, sensor.x + sensor.radius + 1 - i, sensor.y - i);
//     add_bound(p, sensor.x - sensor.radius - 1 + i, sensor.y + i);
//     add_bound(p, sensor.x + sensor.radius + 1 - i, sensor.y + i);
//   }

//   return p;
// }

// function isfree(sensors: Sensor[], pos: Pos): boolean {
//   return sensors.every((s) => {
//     const dist = Math.abs(s.x - pos.x) + Math.abs(s.y - pos.y);
//     return dist > s.radius;
//   });
// }

// export function solve(): number {
//   const map = loadMap();
//   const sensors = map.map((m) => m.sensor);
//   const peripheries: Record<number, Pos[]> = {};
//   const candidates: Record<string, number> = {};

//   // Calculate periphery positions for each sensor
//   sensors.forEach((sensor) => {
//     peripheries[sensor.index] = periphery(sensor);
//   });

//   // Calculate intersections between sensor peripheries
//   for (let i = 0; i < sensors.length; i++) {
//     for (let j = i; j < sensors.length; j++) {
//       const p1 = peripheries[i];
//       const p2 = peripheries[j];
//       const intersects = p1.filter((x) => p2.includes(x));
//       intersects.forEach((i) => {
//         const key = `${i.x},${i.y}`;
//         if (candidates[key] === undefined) {
//           candidates[key] = 0;
//         }
//         candidates[key] += 1;
//       });
//     }
//   }

//   // Find sensor with most sensors
//   Object.entries(candidates).forEach(([key, val]) => {
//     if (val < 4) return;
//     const [x, y] = key.split(",").map(Number);
//     if (!isfree(sensors, { x, y })) {
//       return;
//     }

//     console.info(x, y);
//     console.info(x * 4000000 + y);
//     throw new Error("bruh");
//   });

//   return -1;
// }

// console.info(solve());
