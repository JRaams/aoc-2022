import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { toBase10, toBase5 } from "./a.ts";

Deno.test("toBase10 brochure", () => {
  assertEquals(toBase10("1"), 1);
  assertEquals(toBase10("2"), 2);
  assertEquals(toBase10("1="), 3);
  assertEquals(toBase10("1-"), 4);
  assertEquals(toBase10("10"), 5);
  assertEquals(toBase10("11"), 6);
  assertEquals(toBase10("12"), 7);
  assertEquals(toBase10("2="), 8);
  assertEquals(toBase10("2-"), 9);
  assertEquals(toBase10("20"), 10);
  assertEquals(toBase10("1=0"), 15);
  assertEquals(toBase10("1-0"), 20);
  assertEquals(toBase10("1=11-2"), 2022);
  assertEquals(toBase10("1-0---0"), 12345);
  assertEquals(toBase10("1121-1110-1=0"), 314159265);
});

Deno.test("toBase10 example", () => {
  assertEquals(toBase10("1=-0-2"), 1747);
  assertEquals(toBase10("12111"), 906);
  assertEquals(toBase10("2=0="), 198);
  assertEquals(toBase10("21"), 11);
  assertEquals(toBase10("2=01"), 201);
  assertEquals(toBase10("111"), 31);
  assertEquals(toBase10("20012"), 1257);
  assertEquals(toBase10("112"), 32);
  assertEquals(toBase10("1=-1="), 353);
  assertEquals(toBase10("1-12"), 107);
  assertEquals(toBase10("12"), 7);
  assertEquals(toBase10("1="), 3);
  assertEquals(toBase10("122"), 37);
});

Deno.test("toBase5 example", () => {
  assertEquals(toBase5(1747), "1=-0-2");
  assertEquals(toBase5(906), "12111");
  assertEquals(toBase5(198), "2=0=");
  assertEquals(toBase5(11), "21");
  assertEquals(toBase5(201), "2=01");
  assertEquals(toBase5(31), "111");
  assertEquals(toBase5(1257), "20012");
  assertEquals(toBase5(32), "112");
  assertEquals(toBase5(353), "1=-1=");
  assertEquals(toBase5(107), "1-12");
  assertEquals(toBase5(7), "12");
  assertEquals(toBase5(3), "1=");
  assertEquals(toBase5(37), "122");
});

Deno.test("toBase5 sum", () => {
  assertEquals(toBase5(4890), "2=-1=0");
});
