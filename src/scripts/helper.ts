export function sum(array: number[]): number {
  let total = 0;
  let i = array.length;

  while (i--) {
    total += array[i];
  }

  return total;
}
