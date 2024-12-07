export function forEach<TItem extends unknown>(
  arr: TItem[],
  callback: (item: TItem, index: number, arr: TItem[]) => boolean | void,
) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const res = callback(item, i, arr);

    if (res === false) {
      break;
    }
  }
}
