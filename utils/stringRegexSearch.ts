/**
 * Searches for a regex pattern in a list of strings.
 *
 * Usage example:
 * ```ts
 *   const data = ["abc", "def", "ghi"];
 *   const search = /a|b|c/;
 *   const result = stringRegexSearch(search)(data);
 * ```
 */
export function stringRegexSearch(search: RegExp) {
  return (data: string[]) => {
    const result: string[] = [];

    const letters: string[] = [];
    for (const line of data) {
      letters.push(...line.split(""));
    }

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
  };
}
