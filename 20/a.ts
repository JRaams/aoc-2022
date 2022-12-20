import { decrypt, loadNums } from "./num.ts";

function solve(): number {
  const nums = loadNums();
  return decrypt(nums, 1, 1);
}

console.info(solve());
