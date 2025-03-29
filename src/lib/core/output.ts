import { NamingType } from "@/enums/naming-type.enum";

export function getConvertedText(
  type: NamingType,
  input: string,
  index?: number
) {
  const text = input.toLowerCase();

  switch (type) {
    case NamingType.KEBAB:
      return convertToKebab(text, index);
    case NamingType.CAMEL:
      return convertToCamel(text, index);
    case NamingType.PASCAL:
      return convertToPascal(text);
    case NamingType.SNAKE:
      return convertToSnake(text, index);
    case NamingType.SCREAMING_SNAKE:
      return convertToScreamSnake(input, index); // Don't need to be lowercased
    case NamingType.DOT:
      return convertToDot(text, index);
    default:
      return defaultConvert(input);
  }
}

export function convertToKebab(text: string, index?: number) {
  if (!index) return text;
  return "-" + text;
}

export function convertToCamel(text: string, index?: number) {
  if (!index) return text;
  return convertCamel(text);
}

export function convertToPascal(text: string) {
  return convertCamel(text);
}

export function convertToSnake(text: string, index?: number) {
  if (!index) return text;
  return "_" + text;
}

export function convertToScreamSnake(text: string, index?: number) {
  if (!index) return text.toUpperCase();
  return "_" + text.toUpperCase();
}

export function convertToDot(text: string, index?: number) {
  if (!index) return text;
  return "." + text;
}

export function defaultConvert(text: string) {
  return text;
}

// helper function

function convertCamel(text: string) {
  const letterIdx = text.search(/[a-zA-Z]/);

  if (letterIdx < 0) return text;

  if (letterIdx > 0) {
    const capitalized =
      text.slice(0, letterIdx) +
      text[letterIdx].toUpperCase() +
      text.slice(letterIdx + 1);

    return capitalized;
  }

  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
}
