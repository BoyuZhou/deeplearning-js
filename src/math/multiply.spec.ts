import { Array2D } from '../data/';
import multiply from './multiply';

test('valid matrix multiply', () => {
  const left = new Array2D([1, 3], [1, 2, 3]);
  const right = new Array2D([1, 3], [1, 2, 3]);
  const ro = multiply(left, right);
  expect(ro.matrix).toEqual([
    [1, 4, 9]
  ]);
});
