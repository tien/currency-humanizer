const units = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "zero",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

// prob a math term for this, but I never learn basic math in English
const processNumber = (number: number, modulo: 10 | 100 | 1000) => {
  if (number === modulo) return { unit: 1, remainder: 0 };

  const remainder = number % modulo;
  const unit = (number - (number % modulo)) / modulo;

  return { unit, remainder };
};

export const recNumberToWords: (
  number: number,
  shouldAddAnd: boolean
) => string[] = (number: number, shouldAddAnd: boolean) => {
  if (number < 0 || number > 1000) throw new Error("We don't do that here");

  if (number === 0) return [];

  if (number < 20) return [units[number]];

  if (number < 100) {
    const { unit, remainder } = processNumber(number, 10);

    return [tens[unit], ...recNumberToWords(remainder, shouldAddAnd)];
  }

  if (number < 1000) {
    const { unit, remainder } = processNumber(number, 100);

    return [
      `${units[unit]} hundred${shouldAddAnd ? " and" : ""}`,
      ...recNumberToWords(remainder, shouldAddAnd),
    ];
  }

  return ["one thousand"];
};

export const numberToWords = (number: number, shouldAddAnd: boolean) => {
  if (number === 0) return ["zero"];

  return recNumberToWords(number, shouldAddAnd).join(" ");
};

export const moneyToWords = (number: number) => {
  const [dollars, cents] = number.toFixed(2).split(".");
  const dollarsNumber = Number.parseInt(dollars);
  const centsNumber = Number.parseInt(cents);
  const hasDollars = dollarsNumber > 0;
  const hasCents = centsNumber > 0;

  const dollarsWord =
    !hasDollars && hasCents
      ? ""
      : `${numberToWords(dollarsNumber, !hasCents)} dollars`;
  const centsWord =
    centsNumber > 0
      ? `${hasDollars ? " and " : ""}${numberToWords(centsNumber, true)} cents`
      : "";

  return dollarsWord + centsWord;
};
