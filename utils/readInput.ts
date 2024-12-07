import * as path from "jsr:@std/path";

export async function readInputFile(
  baseDir = import.meta.dirname,
  filename = "input.txt",
): Promise<string[]> {
  console.log(baseDir);
  const filePath = path.join(baseDir ?? "", filename);

  const input = await Deno.readTextFile(filePath);
  const rows = input.split("\n");

  if (rows[rows.length - 1] === "") {
    rows.pop();
  }

  return rows;
}
