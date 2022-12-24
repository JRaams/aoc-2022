/**
 * Greatest Common Divisor
 * @param a
 * @param b
 * @returns The largest positive integer that DIVIDES both numbers without remainder
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b != 0) {
    const t = b;
    b = a % b;
    a = t;
  }

  return a;
}

/**
 * Least Common Multiple
 * @param a
 * @param b
 * @returns The smallest positive integer that is DIVISIBLE by BOTH a and b
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
