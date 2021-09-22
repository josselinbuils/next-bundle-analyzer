import { ObjectFilter } from '../interfaces/Options';

export function filterObject(
  obj: any,
  filter: ObjectFilter | null
): Record<string, unknown> {
  if (!filter) {
    return obj;
  }

  const filterKeys = Object.keys(filter);

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => filterKeys.includes(key) && filter[key] !== false)
      .map(([key, value]) => [
        key,
        filter[key] === true
          ? value
          : filterObject(value, filter[key] as ObjectFilter),
      ])
  );
}
