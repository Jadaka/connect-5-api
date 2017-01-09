import Gamelogic from './gamelogic';
import { every } from 'lodash';

describe('The logic instance', () => {
  let gamelogic = new Gamelogic();

  it('should contain a 19x19 2-d array filled with 0s', () => {
    let allZeroes = every(gamelogic.board, (row) => {
      return row.length === 19 && row.reduce((accum, item) => {
        return accum && item === 0;
      }, true);
    });
    expect(gamelogic.board.length).toBe(19);
    expect(allZeroes).toBe(true);
  });
});
