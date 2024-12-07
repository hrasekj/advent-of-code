import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";

const test = false;
const input = test ? await readInputFile(Deno.cwd(), "input.txt") : [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

let sum = 0;

pipe(
  // horizontalSearch,
  (data: string[]) => {
    const words = crossSearch(data, 0, 1);
    sum += words.length;
    // console.log("horizontalSearch", words);
    return data;
  },
  // verticalSearch,
  (data) => {
    const words = crossSearch(data, 1, 0);
    sum += words.length;
    // console.log("verticalSearch", words);
    return data;
  },
  // crossSearch,
  (data) => {
    const words = crossSearch(data, 1, 1);
    sum += words.length;
    // console.log("crossSearch", words);
    return data;
  },
  (data) => {
    const words = crossSearch(
      data.toReversed(),
      1,
      1,
    );
    sum += words.length;
    // console.log("crossSearch", words);
    return data;
  },
)(input as string[]);

console.log({ sum });

//
// utils
//

function crossSearch(data: string[], mx: number, my: number): string[] {
  const rowsCount = data.length;
  const lineLength = data[0].length;

  const words: string[] = [];

  for (let x = 0; x < lineLength; x++) {
    for (let y = 0; y < rowsCount; y++) {
      const wX = data[y]?.[x] ?? "";
      const wM = data[y + (1 * my)]?.[x + (1 * mx)] ?? "";
      const wA = data[y + (2 * my)]?.[x + (2 * mx)] ?? "";
      const wS = data[y + (3 * my)]?.[x + (3 * mx)] ?? "";

      const word = wX + wM + wA + wS;

      if (!["XMAS", "SAMX"].includes(word)) continue;

      words.push(word);
    }
  }

  return words;
}
