import { expect } from "@std/expect";
import {
  findAppearances,
  getDistances,
  getSimilarities,
  prepareInputData,
  rotateData,
  sortData,
} from "./util.ts";

const mockInput = [
  "3   4",
  "4   3",
  "2   5",
  "1   3",
  "3   9",
  "3   3",
];

Deno.test("Day 1.", async (t) => {
  let result: number[][];

  await t.step("prepare data", () => {
    result = prepareInputData(mockInput);
    expect(result).toEqual([
      [3, 4],
      [4, 3],
      [2, 5],
      [1, 3],
      [3, 9],
      [3, 3],
    ]);
  });

  await t.step("rotate data", () => {
    result = rotateData(result);
    expect(result).toEqual([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]);
  });

  await t.step("sort data", () => {
    result = sortData(result);
    expect(result).toEqual([
      [1, 2, 3, 3, 3, 4],
      [3, 3, 3, 4, 5, 9],
    ]);
  });

  await t.step("find similarities", () => {
    const mockAppearancesData = [
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ];

    const result = findAppearances(mockAppearancesData);
    expect(result).toEqual([
      [3, 4, 2, 1, 3, 3],
      [3, 1, 0, 0, 3, 3],
    ]);
  });

  await t.step("sum data", () => {
    const mockRotatedSortedData = [
      [1, 3],
      [2, 3],
      [3, 3],
      [3, 4],
      [3, 5],
      [4, 9],
    ];

    const result = getDistances(mockRotatedSortedData);
    expect(result).toEqual([2, 1, 0, 1, 2, 5]);
  });

  await t.step("get appearances", () => {
    const mockRotatedAppearancesData = [
      [3, 3],
      [4, 1],
      [2, 0],
      [1, 0],
      [3, 3],
      [3, 3],
    ];

    const result = getSimilarities(mockRotatedAppearancesData);
    expect(result).toEqual([9, 4, 0, 0, 9, 9]);
  });
});
