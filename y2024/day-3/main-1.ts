import { pipe } from "rambda";
import { readInputFile } from "../../utils/readInput.ts";
import { handleMul, prepareInputData } from "./util.ts";
import { forEach } from "../../utils/forEach.ts";

const input = await readInputFile(Deno.cwd(), "input.txt");

pipe(
  prepareInputData,
  function (data) {
    let sum = 0n;
    let count = true;
    forEach(data, (line) => {
      if (line === "don't()") count = false;
      if (line === "do()") count = true;

      if (!count || !line.startsWith("mul(")) return;

      sum += handleMul(line);
    });
    console.log(sum);
  },
  // function (data) {
  //   const result = data.map((v) => v[0] * v[1]); //.reduce((acc, v) => acc + v, 0);

  //   let sum = 0n;
  //   forEach(result, (num, index) => {
  //     if (Number.isNaN(num)) {
  //       console.log("NaN", index);
  //     }

  //     sum += BigInt(num);
  //     console.log(sum);
  //   });
  //   // console.log(sum);
  // },
)(input);
