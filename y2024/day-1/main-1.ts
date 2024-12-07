import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import {
  getDistances,
  prepareInputData,
  rotateData,
  sortData,
} from "./util.ts";

const input = await readInputFile(Deno.cwd());

const result = pipe(
  prepareInputData,
  rotateData,
  sortData,
  rotateData,
  getDistances,
)(input);

console.log({
  result,
  sum: result.reduce((acc, val) => acc + val, 0),
});
