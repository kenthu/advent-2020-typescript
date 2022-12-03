import { readFileSync } from 'fs';

import _ from 'lodash';

interface PasswordData {
  minOccurrences: number;
  maxOccurrences: number;
  requiredChar: string;
  password: string;
}

const ingestInput = (filename: string): PasswordData[] => {
  const lines = readFileSync(filename, 'utf8').trim().split('\n');
  const regex = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/;
  return lines.map((line) => {
    const match = regex.exec(line);
    if (match === null) {
      throw new Error(`Line "${line}" did not match regex`);
    }

    return {
      minOccurrences: Number(match[1]),
      maxOccurrences: Number(match[2]),
      requiredChar: match[3],
      password: match[4],
    };
  });
};

const isPasswordValid = ({
  minOccurrences,
  maxOccurrences,
  requiredChar,
  password,
}: PasswordData): boolean => {
  const numOccurrences = _.countBy(password.split(''))[requiredChar] || 0;
  return numOccurrences >= minOccurrences && numOccurrences <= maxOccurrences;
};

const result = (filename: string) => {
  const passwordDatas = ingestInput(filename);
  return passwordDatas.filter((passwordData) => isPasswordValid(passwordData)).length;
};

// Test
console.log(result('day02/test-input.txt'));
// 2

// Solution
console.log(result('day02/input.txt'));
// 424
