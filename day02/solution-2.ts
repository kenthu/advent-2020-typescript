import { readFileSync } from 'fs';

interface PasswordData {
  pos1: number;
  pos2: number;
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
      pos1: Number(match[1]),
      pos2: Number(match[2]),
      requiredChar: match[3],
      password: match[4],
    };
  });
};

const isPasswordValid = ({ pos1, pos2, requiredChar, password }: PasswordData): boolean => {
  const numOccurrences =
    (password[pos1 - 1] === requiredChar ? 1 : 0) + (password[pos2 - 1] === requiredChar ? 1 : 0);
  return numOccurrences === 1;
};

const result = (filename: string) => {
  const passwordDatas = ingestInput(filename);
  return passwordDatas.filter((passwordData) => isPasswordValid(passwordData)).length;
};

// Test
console.log(result('day02/test-input.txt'));
// 1

// Solution
console.log(result('day02/input.txt'));
// 747
