import { moneyToWords } from "../src/utils";

describe("moneyToWords", () => {
  test.each([
    [0, "zero dollars"],
    [0.12, "twelve cents"],
    [10.55, "ten dollars and fifty five cents"],
    [120, "one hundred and twenty dollars"],
    [557.57, "five hundred fifty seven dollars and fifty seven cents"],
  ])("from input %d expected %s", (input, expectedOutput) => {
    const words = moneyToWords(input);

    expect(words).toEqual(expectedOutput);
  });
});
