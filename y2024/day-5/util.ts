import { forEach } from "../../utils/forEach.ts";

export function prepareData(data: string[]) {
  const orderings: number[][] = [];
  const pages: number[][] = [];

  let addOrds = true;
  forEach(data, (row) => {
    if (row === "") {
      addOrds = false;
      return;
    }

    if (addOrds) {
      const parsedRow = row.split("|").map((i) => parseInt(i));
      orderings.push(parsedRow);
    } else {
      const parsedRow = row.split(",").map((i) => parseInt(i));
      pages.push(parsedRow);
    }
  });

  return { orderings, pages };
}
