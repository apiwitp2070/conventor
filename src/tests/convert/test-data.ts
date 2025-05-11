import { NamingType } from "@/enums/naming-type.enum";

export const kebabCases: [string, NamingType, string][] = [
  ["helloWorld", NamingType.CAMEL, "hello-world"],
  ["HelloWorld", NamingType.PASCAL, "hello-world"],
  ["hello_world", NamingType.SNAKE, "hello-world"],
  ["HELLO_WORLD", NamingType.SCREAMING_SNAKE, "hello-world"],
  ["hello.world", NamingType.DOT, "hello-world"],
  [
    "multiple__separators--here",
    NamingType.SNAKE,
    "multiple--separators--here",
  ],
  ["hello123World", NamingType.CAMEL, "hello123-world"],
  ["hélloWorld", NamingType.CAMEL, "héllo-world"],
  ["user@name.com", NamingType.DOT, "user@name-com"],
];

export const camelCases: [string, NamingType, string][] = [
  ["hello-world", NamingType.KEBAB, "helloWorld"],
  ["hello_world", NamingType.SNAKE, "helloWorld"],
  ["hello.world", NamingType.DOT, "helloWorld"],
  ["helloWorld", NamingType.CAMEL, "helloWorld"],
  ["héllo-world", NamingType.KEBAB, "hélloWorld"],
  ["çamel_case-text", NamingType.SNAKE, "çamelCase-text"],
];

export const pascalCases: [string, NamingType, string][] = [
  ["hello-world", NamingType.KEBAB, "HelloWorld"],
  ["hello_world", NamingType.SNAKE, "HelloWorld"],
  ["hello.world", NamingType.DOT, "HelloWorld"],
  ["helloWorld", NamingType.CAMEL, "HelloWorld"],
  ["héllo-world", NamingType.KEBAB, "HélloWorld"],
  ["çamel_case-text", NamingType.SNAKE, "ÇamelCase-text"],
];

export const snakeCases: [string, NamingType, string][] = [
  ["helloWorld", NamingType.CAMEL, "hello_world"],
  ["HelloWorld", NamingType.PASCAL, "hello_world"],
  ["hello-world", NamingType.KEBAB, "hello_world"],
  ["HELLO.WORLD", NamingType.SCREAMING_SNAKE, "hello.world"],
  ["hello.world", NamingType.DOT, "hello_world"],
  ["naïve-user_test", NamingType.KEBAB, "naïve_user_test"],
  ["hello123World", NamingType.CAMEL, "hello123_world"],
];

export const screamingSnakeCases: [string, NamingType, string][] = [
  ["hello-world", NamingType.KEBAB, "HELLO_WORLD"],
  ["helloWorld", NamingType.CAMEL, "HELLO_WORLD"],
  ["HelloWorld", NamingType.PASCAL, "HELLO_WORLD"],
  ["hello.world", NamingType.DOT, "HELLO_WORLD"],
  ["héllo-world", NamingType.KEBAB, "HÉLLO_WORLD"],
  ["test123Case", NamingType.CAMEL, "TEST123_CASE"],
];

export const dotCases: [string, NamingType, string][] = [
  ["hello-world", NamingType.KEBAB, "hello.world"],
  ["hello_world", NamingType.SNAKE, "hello.world"],
  ["HELLO_WORLD", NamingType.SCREAMING_SNAKE, "hello.world"],
  ["HelloWorld", NamingType.PASCAL, "hello.world"],
  ["hélloWorld", NamingType.CAMEL, "héllo.world"],
  ["user@name.com", NamingType.DOT, "user@name.com"],
];
