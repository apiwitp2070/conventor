import { NamingType } from "@/enums/naming-type.enum";

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
  return str.split("-");
}

export function splitCamelCase(str: string) {
  return str.replace(/(.)([A-Z])/g, "$1 $2").split(" ");
}

export function splitPascalCase(str: string) {
  return str.replace(/(.)([A-Z])/g, "$1 $2").split(" ");
}

export function splitSnakeCase(str: string) {
  return str.split("_");
}

export function splitDotCase(str: string) {
  return str.split(".");
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
