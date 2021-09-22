import { ObjectFilter } from '../interfaces/Options';

export function filterObject(obj: any, filter: ObjectFilter | null): any {
  if (!filter) {
    return obj;
  }

  if (Array.isArray(filter)) {
    if (!Array.isArray(obj)) {
      return obj;
    }
    return obj.map((value) => filterObject(value, filter[0] as ObjectFilter));
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
