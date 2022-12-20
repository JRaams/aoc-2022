import { decrypt, loadNums } from "./num.ts";

function solve(): number {
  const nums = loadNums();
  return decrypt(nums, 811589153, 10);
}

console.info(solve());
