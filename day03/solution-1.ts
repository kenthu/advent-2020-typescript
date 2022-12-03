import { readFileSync } from 'fs';

type Grid = boolean[][];

const ingestInput = (filename: string): Grid => {
  const lines = readFileSync(filename, 'utf8').trim().split('\n');
  return lines.map((line) => line.split('').map((cell) => cell === '#'));
};

const speed_right = 3;
const speed_down = 1;

const result = (filename: string) => {
  const grid = ingestInput(filename);
  const width = grid[0].length;
  const height = grid.length;

  let [x, y] = [0, 0];
  let numTrees = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    x = (x + speed_right) % width;
    y += speed_down;
    if (y >= height) break;
    if (grid[y][x]) numTrees++;
  }
  return numTrees;
};

// Test
console.log(result('day03/test-input.txt'));
// 7

// Solution
console.log(result('day03/input.txt'));
// 173
