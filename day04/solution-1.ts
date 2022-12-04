import { readFileSync } from 'fs';

const ingestInput = (filename: string): string[][] => {
  const passports = readFileSync(filename, 'utf8')
    .trim()
    .split('\n\n')
    .map((passport) => passport.split(/[\n ]/));
  return passports;
};

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const isPassportValid = (passport: string[]): boolean => {
  const fieldKeys = new Set(passport.map((field) => field.split(':')[0]));
  return REQUIRED_FIELDS.every((requiredField) => fieldKeys.has(requiredField));
};

const result = (filename: string) => {
  const passports = ingestInput(filename);
  return passports.filter((passport) => isPassportValid(passport)).length;
};

// Test
console.log(result('day04/test-input.txt'));
// 2

// Solution
console.log(result('day04/input.txt'));
// 264
