import { forEach } from "../../utils/forEach.ts";

export function prepareInputData(data: string[]) {
  const result: string[] = [];

  const letters: string[] = [];
  forEach(data, (line) => void letters.push(...line.split("")));

  const search = /mul\(\d+,\d+\)|do\(\)|don't\(\)/;
  let word = "";
  do {
    word += letters.shift();

    const found = search.exec(word);

    if (found !== null) {
      result.push(found[0]);
      word = "";
    }
  } while (letters.length > 0);

  return result;
}

const splitRegex = /mul\(|,|\)/;
export function handleMul(str: string) {
  const [a, b] = str.split(splitRegex).filter((v) => v !== "").map(BigInt);
  return a * b;
}
