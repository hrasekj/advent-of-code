import { expect } from "@std/expect";
import { calcResult, combinations, con, mul, sum } from "./util.ts";

Deno.test("combinations", async (t) => {
  const combos = combinations(["M", "S"]);

  const scenarios = [
    {
      len: 1,
      expected: [["M"], ["S"]],
    },
    {
      len: 2,
      expected: [
        ["M", "M"],
        ["M", "S"],
        ["S", "M"],
        ["S", "S"],
      ],
    },
    {
      len: 3,
      expected: [
        ["M", "M", "M"],
        ["M", "M", "S"],
        ["M", "S", "M"],
        ["M", "S", "S"],
        ["S", "M", "M"],
        ["S", "M", "S"],
        ["S", "S", "M"],
        ["S", "S", "S"],
      ],
    },
  ];

  for (const scenario of scenarios) {
    await t.step(`lenght: ${scenario.len}`, () => {
      const result = combos(scenario.len);
      expect(result).toEqual(scenario.expected);
    });
  }
});

Deno.test("calcResult", async (t) => {
  const scenarios = [
    {
      nums: [1n, 2n, 3n],
      operations: [sum, sum],
      expected: 6n,
    },
    {
      nums: [1n, 2n, 3n, 4n],
      operations: [sum, sum, mul],
      expected: 24n,
    },
    {
      nums: [10n, 19n],
      operations: [mul],
      expected: 190n,
    },
    {
      nums: [81n, 40n, 27n],
      operations: [mul, sum],
      expected: 3267n,
    },
    {
      nums: [81n, 40n, 27n],
      operations: [sum, mul],
      expected: 3267n,
    },
    {
      nums: [11n, 6n, 16n, 20n],
      operations: [sum, mul, sum],
      expected: 292n,
    },
    {
      nums: [15n, 6n],
      operations: [con],
      expected: 156n,
    },
    {
      nums: [17n, 8n, 14n],
      operations: [con, sum],
      expected: 192n,
    },
    {
      nums: [6n, 8n, 6n, 15n],
      operations: [mul, con, mul],
      expected: 7290n,
    },
  ];

  for (const scenario of scenarios) {
    await t.step(`nums: ${scenario.nums.join(" ")}`, () => {
      const result = calcResult(scenario.nums, scenario.operations);
      expect(result).toEqual(scenario.expected);
    });
  }
});
