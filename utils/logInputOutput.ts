// deno-lint-ignore no-explicit-any
export function logInputOutput<T extends (...args: any[]) => unknown>(
  fn: T,
  logme = true,
) {
  return (...input: Parameters<T>): ReturnType<T> => {
    const output = fn.apply(undefined, input) as ReturnType<T>;
    if (logme) console.log(fn.name, { input, output });
    return output;
  };
}
