import * as path from "jsr:@std/path";

type Options<Split extends boolean> = {
  removeLastEmptyLine?: boolean;
  split?: Split;
};

export function readInputFile(
  baseDir?: string,
  filename?: string,
  opts?: Options<false>,
): Promise<string>;

export function readInputFile(
  baseDir?: string,
  filename?: string,
  opts?: Options<true>,
): Promise<string[]>;

export async function readInputFile<Split extends boolean = true>(
  baseDir = import.meta.dirname,
  filename = "input.txt",
  opts: Options<Split> = {},
): Promise<string | string[]> {
  const filePath = path.join(baseDir ?? "", filename);

  const input = await Deno.readTextFile(filePath);

  if (opts.split === false) return input;

  const rows = input.split("\n");

  if (opts.removeLastEmptyLine !== false && rows[rows.length - 1] === "") {
    rows.pop();
  }

  return rows;
}
