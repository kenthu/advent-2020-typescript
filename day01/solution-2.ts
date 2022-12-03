import { readFileSync } from 'fs';

const ingestInput = (filename: string): number[] => {
  const lines = readFileSync(filename, 'utf8').trim().split('\n');
  return lines.map((line) => Number(line));
};

const result = (filename: string) => {
  const nums = ingestInput(filename);
  const prevNums = new Set<number>();
  for (const num1 of nums) {
    for (const num2 of prevNums.values()) {
      const num3 = 2020 - num1 - num2;
      if (prevNums.has(num3)) {
        return num1 * num2 * num3;
      }
    }
    prevNums.add(num1);
  }
  throw new Error('Triple not found');
};

// Test
console.log(result('day01/test-input.txt'));
// 241861950

// Solution
console.log(result('day01/input.txt'));
// 201251610
