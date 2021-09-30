export function getQueryRegex(query: string): RegExp | undefined {
  try {
    return new RegExp(query.trim(), 'iu');
  } catch {
    return undefined;
  }
}
