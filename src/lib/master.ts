import { NamingType } from "@/enums/naming-type.enum";

export const typeOptions = [
  { value: NamingType.KEBAB, text: "kebab-case" },
  { value: NamingType.CAMEL, text: "camelCase" },
  { value: NamingType.PASCAL, text: "PascalCase" },
  { value: NamingType.SNAKE, text: "snake_case" },
  { value: NamingType.SCREAMING_SNAKE, text: "SCREAMING_SNAKE" },
  { value: NamingType.DOT, text: "dot.case" },
];
