import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import { forEach } from "../../utils/forEach.ts";
import { prepareData } from "./util.ts";

const test = true;
const input = test ? await readInputFile(Deno.cwd(), "input.txt") : [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
  "",
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

let sum = 0;

pipe(
  prepareData,
  ({ orderings, pages }) => {
    return pages.filter((page) => {
      const isCorrect = orderings.every((order) => {
        const filtered = page.filter((num) => order.includes(num));
        if (filtered.length < 2) return true;
        return filtered.join("") === order.join("");
      });

      return isCorrect;
    });
  },
  // get the middle page from each result to get final sum
  (pages: number[][]) => {
    forEach(pages, (row) => {
      const index = (row.length - 1) / 2;
      sum += row[index];
    });
  },
)(input as string[]);

console.log({ sum });
