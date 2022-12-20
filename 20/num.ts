export class Num {
  value: number;
  prev!: Num;
  next!: Num;

  constructor(value: number) {
    this.value = value;
  }
}

export function loadNums(): Num[] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const input: number[] = lines.split("\n").filter((l) => l).map(Number);

  // Create a Num node for each number
  const nums: Num[] = [];
  input.forEach((n) => {
    nums.push(new Num(n));
  });

  // Attach prev, next nodes to each node
  for (let i = 1; i < input.length; i++) {
    nums[i].prev = nums[i - 1];
    nums[i - 1].next = nums[i];
  }
  nums[0].prev = nums[input.length - 1];
  nums[input.length - 1].next = nums[0];

  return nums;
}

export function getNodeAt(node: Num, distFromNode: number): Num {
  while (distFromNode < 0) {
    node = node.prev;
    distFromNode++;
  }
  while (distFromNode > 0) {
    node = node.next;
    distFromNode--;
  }
  return node;
}

/**
 * [4, [1], 2, -3, 3, -2, 0]
 *
 * 4.next = 2 <-> 2.prev = 4
 * 2.next = 1 <-> 1.prev = 2
 * 1.next = -3 <-> -3.prev = 1
 *
 * [4, 2, [1], -3, 3, -2, 0]
 */
export function mix(node: Num, totalCount: number): void {
  // Update direct neighbours
  let toSwap = node.prev;
  node.prev.next = node.next;
  node.next.prev = node.prev;

  // Update neighbours of node we're swapping with
  toSwap = getNodeAt(toSwap, node.value % (totalCount - 1));
  node.prev = toSwap;
  node.next = toSwap.next;
  node.prev.next = node;
  node.next.prev = node;
}

export function decrypt(
  nums: Num[],
  decryptionKey: number,
  rounds: number,
): number {
  // Apply decryption key
  let num0!: Num;
  nums.forEach((n) => {
    if (n.value === 0) {
      num0 = n;
    }
    n.value *= decryptionKey;
  });

  // Mix for X rounds
  for (let i = 0; i < rounds; i++) {
    nums.forEach((n) => {
      mix(n, nums.length);
    });
  }

  // Get sum of coordinates after decryption
  const coordsSum = getNodeAt(num0, 1000).value +
    getNodeAt(num0, 2000).value +
    getNodeAt(num0, 3000).value;
  return coordsSum;
}
