import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getSize, loadDirs } from "./dir.ts";

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split("\n");

Deno.test("loadDirs", () => {
  const result = loadDirs(input);

  assertEquals(result.length, 4);

  assertEquals(result[0].name, "root");
  assertEquals(result[0].parent, undefined);
  assertEquals(result[0].files.length, 2);
  assertEquals(result[0].subDirs.length, 2);

  assertEquals(result[1].name, "a");
  assertEquals(result[1].parent?.name, result[0].name);
  assertEquals(result[1].files.length, 3);
  assertEquals(result[1].subDirs.length, 1);

  assertEquals(result[2].name, "e");
  assertEquals(result[2].parent?.name, result[1].name);
  assertEquals(result[2].files.length, 1);
  assertEquals(result[2].subDirs.length, 0);

  assertEquals(result[3].name, "d");
  assertEquals(result[3].parent?.name, result[0].name);
  assertEquals(result[3].files.length, 4);
  assertEquals(result[3].subDirs.length, 0);
});

Deno.test("getSize", () => {
  const result = loadDirs(input);

  const dirE = result.find((r) => r.name === "e")!;
  const sizeE = getSize(dirE);
  assertEquals(sizeE, 584);

  const dirA = result.find((r) => r.name === "a")!;
  const sizeA = getSize(dirA);
  assertEquals(sizeA, 94853);

  const dirD = result.find((r) => r.name === "d")!;
  const sizeD = getSize(dirD);
  assertEquals(sizeD, 24933642);

  const dirRoot = result.find((r) => r.name === "root")!;
  const sizeRoot = getSize(dirRoot);
  assertEquals(sizeRoot, 48381165);
});
