export function prepareInputData(input: string[]): number[][] {
  const result: number[][] = [];

  for (const inputRow of input) {
    const row = inputRow.split(/ +/g).map((x) => x.trim()).map((x) =>
      parseInt(x, 10)
    );
    result.push(row);
  }

  return result;
}

export function validateSequence(data: number[]) {
  const direction = data[0] - data[1];
  if (direction === 0) return false;

  const result: number[] = [];
  let prev: number;

  data.forEach((val, index) => {
    if (index === 0) {
      prev = val;
      return;
    }

    result.push(prev - val);
    prev = val;
  });

  console.log({
    result,
    direction,
  });

  const sum = result
    .map((diff) => {
      if (direction > 0) {
        return +(diff > 0);
      }
      return +(diff < 0);
    })
    .reduce((acc, val) => acc + val, 0);

  return sum === data.length - 1 || sum === 0;
}

export function validateDiff(data: number[]) {
  let prev: number;

  const isValidDiff = data.every((val, index) => {
    if (index === 0) {
      prev = val;
      return true;
    }

    const diff = Math.abs(prev - val);
    prev = val;
    return diff > 0 && diff <= 3;
  });

  return isValidDiff;
}
