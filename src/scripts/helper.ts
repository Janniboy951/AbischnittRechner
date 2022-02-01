import { SubjMarks } from "@/scripts/Types";
export function sum(array: number[]): number {
  let total = 0;
  let i = array.length;

  while (i--) {
    total += array[i];
  }

  return total;
}
export function arrayEquals(a: any[], b: any[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export function range(start: number, end: number): number[] {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export function getLargest(
  marks: SubjMarks,
  n: number
): { maxValues: number[]; chosenYears: string[] } {
  const array: number[] = Object.values(marks);
  array.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

  const sorted = Object.fromEntries(
    Object.entries(marks).sort(([, a], [, b]) => b - a)
  );

  return {
    maxValues: Object.values(sorted).slice(0, n),
    chosenYears: Object.keys(sorted).slice(0, n),
  };
}

export function findCommonElements(arr1: any[], arr2: any[]) {
  return arr1.some((item) => arr2.includes(item));
}
