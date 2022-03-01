export const addCommasToNumber = (value: number, spaceBetween?: boolean) => {
  if (value < 1000) return value.toString();

  const [int, float] = String(value)
    .replace(/(\d+)(\.\d+)/, '$1|$2')
    .split('|');
  const lim = int.length;
  const result = [];
  let count = 0;

  for (let i = lim - 1; i >= 0; i--) {
    if (count === 2) {
      result[i] = `,${spaceBetween ? ' ' : ''}${int[i]}`;
      count = 0;
      continue;
    }

    count++;
    result[i] = int[i];
  }

  return result.join('').replace(spaceBetween ? /^, / : /^,/, '') + (float || '');
};
