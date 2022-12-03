import { readFileSync } from 'fs';

const ingestInput = (filename: string): number[] => {
  const lines = readFileSync(filename, 'utf8').trim().split('\n');
  return lines.map((line) => Number(line));
};

const result = (filename: string) => {
  const nums = ingestInput(filename);
  const prevNums = new Set();
  for (const num1 of nums) {
    const num2 = 2020 - num1;
    if (prevNums.has(num2)) {
      return num1 * num2;
    } else {
      prevNums.add(num1);
    }
  }
  throw new Error('Pair not found');
};

// Part 1 test
console.log(result('day01/test-input.txt'));
// 514579

// Part 1
console.log(result('day01/input.txt'));
// 878724
