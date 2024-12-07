import { expect } from "jsr:@std/expect";
import { readInputFile } from "../readInput.ts";

const expectedResult = [
  "3   4",
  "4   3",
  "2   5",
  "1   3",
  "3   9",
  "3   3",
];

Deno.test("readInputFile custom baseDir", async () => {
  const input = await readInputFile(`${import.meta.dirname}/mock`);
  expect(input).toEqual(expectedResult);
});

Deno.test("readInputFile custom filename", async () => {
  const input = await readInputFile(
    `${import.meta.dirname}/mock`,
    "input2.txt",
  );

  expect(input).toEqual(expectedResult);
});

Deno.test("readInputFile default baseDir", async () => {
  const input = await readInputFile(undefined, `tests/mock/input.txt`);

  expect(input).toEqual(expectedResult);
});