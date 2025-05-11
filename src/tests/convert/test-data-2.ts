// Test cases for the variable name convention converter function
// Each test case is an object with:
// - description: what the test is checking
// - input: the input string to convert
// - from: the input convention type
// - to: the output convention type
// - expected: the expected output after conversion

import { NamingType } from "@/enums/naming-type.enum";

const testCases = [
  {
    description: "Convert from camel to kebab",
    input: "helloWorld",
    from: NamingType.CAMEL,
    to: NamingType.KEBAB,
    expected: "hello-world",
  },
  {
    description: "Convert from kebab to camel",
    input: "hello-world",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld",
  },
  {
    description: "Convert from snake to pascal",
    input: "hello_world",
    from: NamingType.SNAKE,
    to: NamingType.PASCAL,
    expected: "HelloWorld",
  },
  {
    description: "Convert from pascal to snake",
    input: "HelloWorld",
    from: NamingType.PASCAL,
    to: NamingType.SNAKE,
    expected: "hello_world",
  },
  {
    description: "Convert from screaming snake to dot",
    input: "HELLO_WORLD",
    from: NamingType.SCREAMING_SNAKE,
    to: NamingType.DOT,
    expected: "hello.world",
  },
  {
    description: "Convert from dot to screaming snake",
    input: "hello.world",
    from: NamingType.DOT,
    to: NamingType.SCREAMING_SNAKE,
    expected: "HELLO_WORLD",
  },

  {
    description: "Convert from kebab-snake to camel (retain underscore)",
    input: "hello-world_example",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld_example",
  },
  {
    description: "Convert from snake-dot to pascal (retain dot)",
    input: "hello_world.example",
    from: NamingType.SNAKE,
    to: NamingType.PASCAL,
    expected: "HelloWorld.example",
  },
  {
    description: "Convert from dot-kebab to screaming snake (retain hyphen)",
    input: "hello.world-example",
    from: NamingType.DOT,
    to: NamingType.SCREAMING_SNAKE,
    expected: "HELLO_WORLD-EXAMPLE",
  },
  {
    description:
      "Convert from mixed to mixed (retain all non-converted separators)",
    input: "hello-world_example.test",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld_example.test",
  },

  {
    description: "Empty string",
    input: "",
    from: NamingType.CAMEL,
    to: NamingType.KEBAB,
    expected: "",
  },
  {
    description: "Single word",
    input: "hello",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "hello",
  },
  {
    description: "Handle consecutive separators in input",
    input: "hello--world",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld",
  },
  {
    description: "Handle numbers in variable names",
    input: "hello123-world456",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "hello123World456",
  },
  {
    description: "Convert same type to same type",
    input: "hello-world",
    from: NamingType.KEBAB,
    to: NamingType.KEBAB,
    expected: "hello-world",
  },
  {
    description: "Handle leading separator",
    input: "-hello-world",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld",
  },
  {
    description: "Handle trailing separator",
    input: "hello-world-",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "helloWorld",
  },
  {
    description: "Convert already mixed format (camel with underscores)",
    input: "helloWorld_example",
    from: NamingType.CAMEL,
    to: NamingType.KEBAB,
    expected: "hello-world_example",
  },
  {
    description: "Complex mixed separators with all types",
    input: "user.Profile-settings_PREFERENCES.default",
    from: NamingType.DOT,
    to: NamingType.PASCAL,
    expected: "UserProfile-settings_preferencesDefault",
  },

  {
    description: "Handle uppercase abbreviations in camel case",
    input: "getHTTPResponse",
    from: NamingType.CAMEL,
    to: NamingType.KEBAB,
    expected: "get-h-t-t-p-response",
  },
  {
    description: "Handle uppercase abbreviations in snake case",
    input: "get_HTTP_response",
    from: NamingType.SNAKE,
    to: NamingType.CAMEL,
    expected: "getHttpResponse",
  },
  {
    description: "Mixed case with mixed separators",
    input: "API-settings_userPREFERENCES.default",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "apiSettings_userpreferences.default",
  },
  {
    description: "Convert snake to screaming snake",
    input: "api_settings_user",
    from: NamingType.SNAKE,
    to: NamingType.SCREAMING_SNAKE,
    expected: "API_SETTINGS_USER",
  },
  {
    description: "Convert screaming snake to snake",
    input: "API_SETTINGS_USER",
    from: NamingType.SCREAMING_SNAKE,
    to: NamingType.SNAKE,
    expected: "api_settings_user",
  },
  {
    description: "Handle mixed screaming sections",
    input: "get_HTTP_response_URL",
    from: NamingType.SNAKE,
    to: NamingType.PASCAL,
    expected: "GetHttpResponseUrl",
  },
];

const advancedTestCases = [
  {
    description: "Handle all separators at once",
    input: "first-second_third.fourth",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "firstSecond_third.fourth",
  },
  {
    description: "Multiple separators of the same type",
    input: "multiple--separators---test",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "multipleSeparatorsTest",
  },
  {
    description: "Mixed case input with screaming snake as primary",
    input: "HELLO_world-example.TEST",
    from: NamingType.SCREAMING_SNAKE,
    to: NamingType.DOT,
    expected: "hello.world-example.test",
  },
  {
    description: "Convert with numbers between words",
    input: "user123-profile456_settings789",
    from: NamingType.KEBAB,
    to: NamingType.CAMEL,
    expected: "user123Profile456_settings789",
  },
  {
    description: "Retain complex mixed patterns",
    input: "API_settings.USER-preferences_2FA.setup",
    from: NamingType.SNAKE,
    to: NamingType.CAMEL,
    expected: "apiSettings.user-preferences2Fa.setup",
  },
];

export const allTestCases = [...testCases, ...advancedTestCases];
