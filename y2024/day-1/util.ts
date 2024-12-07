export function prepareInputData(input: string[]): number[][] {
  const result: number[][] = [];
  for (const inputRow of input) {
    const row = inputRow.split(/ +/g).map((el) => parseInt(el));

    if (row.some((el) => Number.isNaN(el))) {
      console.error(`Invalid input: ${inputRow}`);
    }

    result.push(row);
  }
  return result;
}

export function rotateData(data: number[][]) {
  const rotatedData: number[][] = [];
  for (const row of data) {
    row.forEach((value, index) => {
      if (!rotatedData[index]) rotatedData[index] = [];
      rotatedData[index].push(value);
    });
  }
  return rotatedData;
}

export function sortData(data: number[][]) {
  const sortedData: number[][] = [];
  for (const row of data) {
    sortedData.push(
      row.toSorted((a, b) => a - b),
    );
  }
  return sortedData;
}

export function getDistances(data: number[][]) {
  const result: number[] = [];
  for (const row of data) {
    const diff = row[0] - row[1];
    result.push(Math.abs(diff));
  }
  return result;
}

export function findAppearances([left, right]: number[][]) {
  const result: number[] = [];
  for (const leftVal of left) {
    result.push(
      right.filter((rightVal) => leftVal === rightVal).length,
    );
  }
  return [left, result];
}

export function getSimilarities(data: number[][]) {
  const result: number[] = [];
  for (const row of data) {
    const diff = row[0] * row[1];
    result.push(diff);
  }
  return result;
}
