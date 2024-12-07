import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import { Coords, Direction, Point, prepareData, walkCoords } from "./util.ts";

const test = false;
const input = test ? await readInputFile(Deno.cwd(), "input.txt") : [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

let sum = 0;

pipe(
  prepareData,
  (coords: Coords) => {
    let guard = coords.find((point) => point.cell === "^")!;

    let paths: string[][] = [];

    const dirs: Direction[] = ["U", "R", "D", "L"];
    let dir: Direction = "U";

    while (true) {
      if (!guard) throw new Error("Guard not found");

      let dirResult: Point[] = [];
      walkCoords(coords, guard, dir, (point) => {
        dirResult.push(point);
      });

      if (["U", "L"].includes(dir)) {
        dirResult.reverse();
      }

      // console.log({ guard, dir, dirResult });
      const barrelPos = dirResult.findIndex((point) => point.cell === "#");

      if (barrelPos !== -1) {
        dirResult = dirResult.slice(0, barrelPos);
      }

      guard = dirResult[dirResult.length - 1];
      dir = dirs[(dirs.indexOf(dir) + 1) % dirs.length];

      const dirCoords = dirResult.map((point) => `${point.x},${point.y}`);

      const cross = dirCoords.find((coord) => paths[0]?.includes(coord));

      console.log({ cross, dirCoords, paths });
      if (cross !== undefined) {
        sum += 1;
        paths = [];
      }

      paths.push(dirCoords);

      if (barrelPos === -1) break;
    }
  },
)(input as string[]);

console.log({ sum });
