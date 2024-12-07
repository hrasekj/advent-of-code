import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";

const test = true;
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
  (data: string[]) => {
    const words = crossSearch(data);
    sum += words.length;
    // console.log("horizontalSearch", words);
    return data;
  },
)(input as string[]);

console.log({ sum });

//
// utils
//

function crossSearch(data: string[]): string[] {
  const rowsCount = data.length;
  const lineLength = data[0].length;

  const words: string[] = [];

  for (let x = 0; x < lineLength; x++) {
    for (let y = 0; y < rowsCount; y++) {
      const wM1 = data[y]?.[x] ?? "";
      const wS1 = data[y]?.[x + 2] ?? "";
      const wA0 = data[y + 1]?.[x + 1] ?? "";
      const wM2 = data[y + 2]?.[x] ?? "";
      const wS2 = data[y + 2]?.[x + 2] ?? "";

      const word = `${wM1}${wS1}${wA0}${wM2}${wS2}`;

      if (!["MSAMS", "SMASM", "MMASS", "SSAMM"].includes(word)) continue;

      words.push(word);
    }
  }

  return words;
}
