import { StringCase } from "./types";

export function titleCase(str: string): string {
  if (!str.length) return str;

  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export function applyStrCase(str: string, strCase: StringCase) {
  const transformers: Record<StringCase, (str: string) => string> = {
    title: str => titleCase(str),
    lowercase: str => str.toLowerCase(),
    uppercase: str => str.toUpperCase(),
  }

  return transformers[strCase](str);
}
