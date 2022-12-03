import { readFileSync } from 'fs';

type Grid = boolean[][];
interface Slope {
  right: number;
  down: number;
}

const ingestInput = (filename: string): Grid => {
  const lines = readFileSync(filename, 'utf8').trim().split('\n');
  return lines.map((line) => line.split('').map((cell) => cell === '#'));
};

const slopes: Slope[] = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const result = (filename: string) => {
  const grid = ingestInput(filename);
  const width = grid[0].length;
  const height = grid.length;

  const treesInPath = (slope: Slope): number => {
    let [x, y] = [0, 0];
    let numTrees = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      x = (x + slope.right) % width;
      y += slope.down;
      if (y >= height) break;
      if (grid[y][x]) numTrees++;
    }
    return numTrees;
  };

  return slopes.reduce((acc, slope) => treesInPath(slope) * acc, 1);
};

// Test
console.log(result('day03/test-input.txt'));
// 336

// Solution
console.log(result('day03/input.txt'));
// 4385176320
