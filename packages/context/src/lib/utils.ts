export function titleCase(str: string): string {
  if (!str.length) return str;

  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
