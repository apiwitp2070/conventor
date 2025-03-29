import { NamingType } from "@/enums/naming-type.enum";
import { getSplittedInputs } from "./input";
import { getConvertedText } from "./output";

export function convert(text: string, from: NamingType, to: NamingType) {
  const inputs = text.split("\n");
  const outputs = convertFromInput(inputs, from, to);
  return outputs.join("\n");
}

export function convertFromInput(
  inputs: string[],
  from: NamingType,
  to: NamingType
) {
  return inputs.map((input) => {
    const splittedInputs = getSplittedInputs(input, from);

    if (!splittedInputs.length) return input;

    const resultText = splittedInputs.map((text, index) => {
      return getConvertedText(to, text, index);
    });

    return resultText.join("");
  });
}
