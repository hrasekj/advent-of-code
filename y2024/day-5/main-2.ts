import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import { forEach } from "../../utils/forEach.ts";
import { prepareData } from "./util.ts";

const test = false;
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
  // "75,47,61,53,29",
  // "97,61,53,29,13",
  // "75,29,13",
  // "75,97,47,61,53",
  // "61,13,29",
  "97,13,75,29,47",
];

let sum = 0;

pipe(
  prepareData,
  ({ orderings, pages }) => {
    const result = pages.filter((page) => {
      const isCorrect = orderings.every((order) => {
        const filtered = page.filter((num) => order.includes(num));
        if (filtered.length < 2) return true;
        return filtered.join("") === order.join("");
      });

      return !isCorrect;
    });

    return { orderings, pages: result };
  },
  // change order of pages by ordering
  ({ orderings, pages }) => {
    const result: number[][] = [];

    forEach(pages, (page) => {
      let prePage = page.slice();

      for (const order of orderings) {
        const indexes = order.map((ord) =>
          prePage.findIndex((pg) => pg === ord)
        );

        if (indexes.includes(-1)) continue; // this one is correct

        const filtered = prePage.filter((num) => order.includes(num));
        // if (filtered.join("") === order.join("")) continue;
        console.log(filtered, order, prePage);

        prePage = prePage.toSpliced(indexes[0], 1, order[1])
          .toSpliced(indexes[1], 1, order[0]);
        // console.log(indexes, order, prePage);
      }
      // return false;

      result.push(prePage);
      // return false;
    });

    // console.log(result);
    return result;
  },
  // get the middle page from each result to get final sum
  (pages: number[][]) => {
    console.log({ pages });
    forEach(pages, (row) => {
      const index = (row.length - 1) / 2;
      sum += row[index];
    });
  },
)(input as string[]);

console.log({ sum });
