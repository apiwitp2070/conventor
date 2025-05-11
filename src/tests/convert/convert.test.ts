import { NamingType } from "@/enums/naming-type.enum";
import { convert } from "@/lib/core/convert";
import {
  camelCases,
  dotCases,
  kebabCases,
  pascalCases,
  screamingSnakeCases,
  snakeCases,
} from "./test-data";
import { test, expect, describe, it } from "vitest";
import { allTestCases } from "./test-data-2";

describe("convert to kebab", () => {
  test.each(kebabCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.KEBAB)).toBe(output);
    }
  );
});

describe("convert to camel", () => {
  test.each(camelCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.CAMEL)).toBe(output);
    }
  );
});

describe("convert to pascal", () => {
  test.each(pascalCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.PASCAL)).toBe(output);
    }
  );
});

describe("convert to snake", () => {
  test.each(snakeCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.SNAKE)).toBe(output);
    }
  );
});

describe("convert to screaming snake", () => {
  test.each(screamingSnakeCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.SCREAMING_SNAKE)).toBe(
        output
      );
    }
  );
});

describe("convert to dot", () => {
  test.each(dotCases)(
    'should convert "%s" to "%s"',
    (input, inputType, output) => {
      expect(convert(input, inputType, NamingType.DOT)).toBe(output);
    }
  );
});

describe("convert test (2)", () => {
  allTestCases.forEach((testCase) => {
    it(testCase.description, () => {
      expect(convert(testCase.input, testCase.from, testCase.to)).toBe(
        testCase.expected
      );
    });
  });
});
