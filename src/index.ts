import { moneyToWords } from "./utils";

const number = Number.parseFloat(process.argv[process.argv.length - 1]);

const money = moneyToWords(number);

console.log(`You owe me ${money}`);
