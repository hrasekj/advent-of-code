export type Direction = "U" | "R" | "D" | "L";
export type Point = { x: number; y: number; cell: string };
export type Coords = Point[];

export function prepareData(data: string[]) {
  const result: Point[] = [];

  data.forEach((row, y) => {
    result.push(
      ...row.split("").map((cell, x) => {
        return { cell, x, y };
      }),
    );
  });

  return result;
}

export function walkCoords(
  coords: Coords,
  start: Point,
  dir: Direction,
  cb: (point: Point) => void,
) {
  for (const point of coords) {
    if (dir === "U" && point.y >= start.y) break;
    if (dir === "U" && point.x != start.x) continue;

    if (dir === "D" && point.y <= start.y) continue;
    if (dir === "D" && point.x != start.x) continue;

    if (dir === "L" && point.y != start.y) continue;
    if (dir === "L" && point.x >= start.x) break;

    if (dir === "R" && point.y != start.y) continue;
    if (dir === "R" && point.x <= start.x) continue;

    cb(point);
  }
}

// function findPoint(coords: Coords, search: string) {
//   const rows = coords.length;
//   const columns = coords[0].length;

//   for (let x = 0; x < columns; x++) {
//     for (let y = 0; y < rows; y++) {
//       const cell = coords[y][x];

//       if (cell === search) {
//         return [x, y];
//       }
//     }
//   }
// }

// function findInDirection(
//   coords: Coords,
//   start: Point,
//   search: string,
//   dir: Direction,
// ) {
//   const rows = coords.length;
//   const columns = coords[0].length;

//   const result: Point[] = [];

//   for (let x = 0; x < columns; x++) {
//     for (let y = 0; y < rows; y++) {
//       const cell = coords[y][x];

//       if (y <= start[1]) continue;
//       if (x <= start[0]) continue;

//       if (dir === "left") {
//         if (y > start[1]) return result;
//       }
//     }
//   }

//   return result;
// }
