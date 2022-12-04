import { readFileSync } from 'fs';

interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
}
const isPassportFieldKey = (key: string): key is keyof Passport => {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].includes(key);
};

const ingestInput = (filename: string): Passport[] => {
  const passports = readFileSync(filename, 'utf8')
    .trim()
    .split('\n\n')
    .map((passport) => {
      return passport.split(/[\n ]/).reduce<Passport>((acc, field) => {
        const [key, value] = field.split(':');
        if (isPassportFieldKey(key)) {
          acc[key] = value;
        }
        return acc;
      }, {});
    });

  return passports;
};

const isValidYear = (year: string | undefined, minYear: number, maxYear: number): boolean => {
  if (year === undefined) return false;
  const yearRegex = /^\d{4}$/;
  const yearNumber = Number(year);
  return yearRegex.test(year) && yearNumber >= minYear && yearNumber <= maxYear;
};

const isValidHeight = (
  height: string | undefined,
  minCm: number,
  maxCm: number,
  minIn: number,
  maxIn: number,
): boolean => {
  if (height === undefined) return false;
  const heightRegex = /^(\d+)(cm|in)$/;
  const heightMatch = heightRegex.exec(height);
  if (!heightMatch) return false;
  const heightNum = Number(heightMatch[1]);
  const heightUnit = heightMatch[2];
  if (heightUnit === 'cm' && (heightNum < minCm || heightNum > maxCm)) return false;
  if (heightUnit === 'in' && (heightNum < minIn || heightNum > maxIn)) return false;
  return true;
};

const isValidHairColor = (hairColor: string | undefined): boolean => {
  if (hairColor === undefined) return false;
  const hairColorRegex = /^#[0-9a-f]{6}$/;
  return hairColorRegex.test(hairColor);
};

const validEyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
const isValidEyeColor = (eyeColor: string | undefined): boolean => {
  if (eyeColor === undefined) return false;
  return validEyeColors.has(eyeColor);
};

const isValidPassportId = (passportId: string | undefined): boolean => {
  if (passportId === undefined) return false;
  const passportIdRegex = /^\d{9}$/;
  return passportIdRegex.test(passportId);
};

const isPassportValid = (passport: Passport): boolean => {
  return (
    isValidYear(passport.byr, 1920, 2002) &&
    isValidYear(passport.iyr, 2010, 2020) &&
    isValidYear(passport.eyr, 2020, 2030) &&
    isValidHeight(passport.hgt, 150, 193, 59, 76) &&
    isValidHairColor(passport.hcl) &&
    isValidEyeColor(passport.ecl) &&
    isValidPassportId(passport.pid)
  );
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
// 224
