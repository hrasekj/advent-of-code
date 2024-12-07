import { expect } from "@std/expect";
import { validateDiff, validateSequence } from "./util.ts";

const mockInput = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

Deno.test("Day 2. - validateSequence", () => {
  const result: number[] = [];
  for (const row of mockInput) {
    const valid = validateSequence(row);
    result.push(+valid);
  }
  console.log({
    result,
    expect: [1, 1, 1, 0, 0, 1],
  });
  expect(result).toStrictEqual([1, 1, 1, 0, 0, 1]);
});

Deno.test("Day 2. - validateSequence reverse", () => {
  const result: number[] = [];
  for (const row of mockInput) {
    const valid = validateSequence(row.reverse());
    result.push(+valid);
  }
  console.log({
    result,
    expect: [1, 1, 1, 0, 0, 1],
  });
  expect(result).toStrictEqual([1, 1, 1, 0, 0, 1]);
});

Deno.test("Day 2. - validateDiff", () => {
  const result: number[] = [];
  for (const row of mockInput) {
    const valid = validateDiff(row);
    result.push(+valid);
  }

  expect(result).toStrictEqual([1, 0, 0, 1, 0, 1]);
});
