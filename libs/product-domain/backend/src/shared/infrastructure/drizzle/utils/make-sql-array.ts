import { sql } from 'drizzle-orm';

const arrayValue = {
  string: (value: string) => `'${value}'`,
  number: (value: string) => Number(value),
};

export function makeSQLArray(array: (string | number)[]) {
  return sql.raw(
    `ARRAY[${array
      .map(item => {
        const key = typeof item === 'number' ? 'number' : 'string';
        return arrayValue[key](String(item));
      })
      .join(', ')}]`
  );
}
