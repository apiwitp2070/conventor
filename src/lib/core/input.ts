import { NamingType } from "@/enums/naming-type.enum";

export function autoConvert(input: string, to: NamingType): string {
  if (!input) return "";

  const separator = getSeparator(to);

  if (!separator) return "";

  return input.replace(/[^a-zA-Z0-9]+/g, separator);
}

export function getSplittedInputs(input: string, from: NamingType) {
  switch (from) {
    case NamingType.KEBAB:
      return splitKebabCase(input);
    case NamingType.CAMEL:
      return splitCamelCase(input);
    case NamingType.PASCAL:
      return splitPascalCase(input);
    case NamingType.SNAKE:
      return splitSnakeCase(input);
    case NamingType.SCREAMING_SNAKE:
      return splitSnakeCase(input);
    case NamingType.DOT:
      return splitDotCase(input);
    default:
      return [];
  }
}

export function splitKebabCase(str: string) {
  const separator = "-";

  if (str.startsWith(separator)) {
    return str.slice(1).split(separator);
  }
  return str.split(separator);
}

export function splitCamelCase(str: string) {
  return splitCamelStr(str);
}

export function splitPascalCase(str: string) {
  return splitCamelStr(str);
}

export function splitSnakeCase(str: string) {
  const separator = "_";

  if (str.startsWith(separator)) {
    return str.slice(1).split(separator);
  }
  return str.split(separator);
}

export function splitDotCase(str: string) {
  const separator = ".";

  if (str.startsWith(separator)) {
    return str.slice(1).split(separator);
  }
  return str.split(separator);
}

export function autoFormatInput(from: NamingType, input: string) {
  switch (from) {
    case NamingType.KEBAB:
      return input.replace(" ", "-");
    case NamingType.SNAKE:
      return input.replace(" ", "_");
    case NamingType.SCREAMING_SNAKE:
      return input.replace(" ", "_");
    case NamingType.DOT:
      return input.replace(" ", ".");
    default:
      return input;
  }
}

// helper

function splitCamelStr(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .flatMap((part) => (/^[A-Z]{2,}$/.test(part) ? part.split("") : [part]));
}

function getSeparator(type: NamingType) {
  switch (type) {
    case NamingType.KEBAB:
      return "-";
    case NamingType.SNAKE:
      return "_";
    case NamingType.SCREAMING_SNAKE:
      return "_";
    case NamingType.DOT:
      return ".";
    default:
      return "";
  }
}
