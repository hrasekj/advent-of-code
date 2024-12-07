import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import {
  calcResult,
  combinations,
  con,
  Equation,
  mul,
  prepareData,
  sum,
} from "./util.ts";

const test = true;
const input = test ? await readInputFile(Deno.cwd(), "input.txt") : [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

let resultSum = 0n;

pipe(
  prepareData,
  (data: Equation[]) => {
    const combos = combinations([mul, sum, con]);
    const result: bigint[] = [];

    for (const row of data) {
      const count = row.numbers.length - 1;

      for (const operations of combos(count)) {
        const theResult = calcResult(row.numbers, operations);

        if (row.result === theResult) {
          result.push(row.result);
          break;
        }
      }
    }

    return result;
  },
  (almostResult) => {
    console.log({ almostResult });
    resultSum = almostResult.reduce((acc, num) => acc + num, 0n);
  },
)(input as string[]);

console.log({ resultSum });
