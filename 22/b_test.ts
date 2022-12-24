import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { markFaces, stitchEdges } from "./b.ts";
import { loadBoard } from "./board.ts";

//  0: Right, 1: Bottom, 2: Left, 3: Up

enum Dir {
  Right = 0,
  Bottom = 1,
  Left = 2,
  Up = 3,
}

Deno.test("Move face1 up", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][50];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, Dir.Up);

  assertEquals(resultTile.x, 0);
  assertEquals(resultTile.y, 3 * 50);
  assertEquals(resultTile.face, 6);
  assertEquals(resultDir, 0);
});

Deno.test("Move face1 right", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][99];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, Dir.Right);

  assertEquals(resultTile.x, 100);
  assertEquals(resultTile.y, 0);
  assertEquals(resultTile.face, 2);
  assertEquals(resultDir, Dir.Right);
});

Deno.test("Move face1 down", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[49][99];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, Dir.Bottom);

  assertEquals(resultTile.x, 99);
  assertEquals(resultTile.y, 50);
  assertEquals(resultTile.face, 3);
  assertEquals(resultDir, Dir.Bottom);
});

Deno.test("Move face1 left", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][50];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, Dir.Left);

  assertEquals(resultTile.x, 0);
  assertEquals(resultTile.y, 150);
  assertEquals(resultTile.face, 4);
  assertEquals(resultDir, Dir.Right);
});
