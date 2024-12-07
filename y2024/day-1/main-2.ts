import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import {
  findAppearances,
  getSimilarities,
  prepareInputData,
  rotateData,
} from "./util.ts";

const input = await readInputFile(Deno.cwd());

const result = pipe(
  prepareInputData,
  rotateData,
  findAppearances,
  rotateData,
  getSimilarities,
)(input);

console.log({
  result,
  sum: result.reduce((acc, val) => acc + val, 0),
});
