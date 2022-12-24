import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { markFaces, stitchEdges } from "./b.ts";
import { BOTTOM, LEFT, loadBoard, RIGHT, UP } from "./board.ts";

Deno.test("Move face1 up", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][50];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, UP);

  assertEquals(resultTile.x, 0);
  assertEquals(resultTile.y, 3 * 50);
  assertEquals(resultTile.face, 6);
  assertEquals(resultDir, RIGHT);
});

Deno.test("Move face1 right", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][99];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, RIGHT);

  assertEquals(resultTile.x, 100);
  assertEquals(resultTile.y, 0);
  assertEquals(resultTile.face, 2);
  assertEquals(resultDir, RIGHT);
});

Deno.test("Move face1 bottom", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[49][99];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, BOTTOM);

  assertEquals(resultTile.x, 99);
  assertEquals(resultTile.y, 50);
  assertEquals(resultTile.face, 3);
  assertEquals(resultDir, BOTTOM);
});

Deno.test("Move face1 left", () => {
  const [tileMap, _] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const t = tileMap[0][50];
  assertEquals(t.face, 1);
  const [resultTile, resultDir] = t.move(1, LEFT);

  assertEquals(resultTile.x, 0);
  assertEquals(resultTile.y, 149);
  assertEquals(resultTile.face, 4);
  assertEquals(resultDir, RIGHT);
});
