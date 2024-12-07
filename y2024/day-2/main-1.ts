import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import { prepareInputData, validateDiff, validateSequence } from "./util.ts";

const input = await readInputFile(Deno.cwd());
// const input = [
//   "7 6 4 2 1",
//   "1 2 7 8 9",
//   "9 7 6 2 1",
//   "1 3 2 4 5",
//   "8 6 4 4 1",
//   "1 3 6 7 9",
// ];

const result = pipe(
  prepareInputData,
  function validateData(data) {
    const result: number[] = [];

    for (const row of data) {
      const isValidSequence = validateSequence(row) ||
        validateSequence(row.toReversed());

      result.push(+(isValidSequence && validateDiff(row)));
    }

    return result;
  },
)(input);

console.log({
  result,
  sum: result.reduce((acc, val) => acc + val, 0),
});
