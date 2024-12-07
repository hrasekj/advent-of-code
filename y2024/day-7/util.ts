export type Equation = { result: bigint; numbers: bigint[] };
export type Func = (a: bigint, b: bigint) => bigint;

export const prepareData = (data: string[]) => {
  const result: Equation[] = [];

  for (const row of data) {
    const split = row.split(": ");
    result.push({
      result: BigInt(split[0]!),
      numbers: split[1].split(" ").map((n) => BigInt(n)),
    });
  }

  return result;
};

export function combinations<T extends unknown>(items: T[]) {
  return (count: number) => {
    const result: T[][] = [];

    let i = 0;
    let bnum = "";

    const toBnum = dec2num(items.length);

    do {
      bnum = toBnum(i).padStart(count, "0");

      result.push(
        bnum.split("").map((v) => items[+v]),
      );

      i++;
    } while (toBnum(i).length <= count);

    return result;
  };
}

export function dec2num(radix: number) {
  return (dec: number) => (dec >>> 0).toString(radix);
}

export function mul(a: bigint, b: bigint) {
  return a * b;
}

export function sum(a: bigint, b: bigint) {
  return a + b;
}

export function con(a: bigint, b: bigint) {
  return BigInt(`${a}${b}`);
}

export function calcResult(numbers: bigint[], operations: Func[]) {
  const numbersCopy = numbers.slice();
  const first = numbersCopy.shift() as bigint;

  return numbersCopy.reduce((acc, num, i) => {
    const op = operations[i];
    return op(acc, num);
  }, first);
}
