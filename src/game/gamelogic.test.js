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

  describe('the set function', () => {
    it('should exist', () => {
      expect(typeof gamelogic.set).toBe('function');
    });

    it('should change board state correctly', () => {
      gamelogic.set('aa', 1);
      gamelogic.set('bb', 2);
      gamelogic.set('ca', 1);
      expect(gamelogic.board[0][0]).toBe(1);
      expect(gamelogic.board[1][1]).toBe(2);
      expect(gamelogic.board[2][0]).toBe(1);
      expect(gamelogic.board[3][3]).toBe(0);
      expect(gamelogic.board[4][3]).toBe(0);
      expect(gamelogic.board[3][4]).toBe(0);
    });
  });

  describe('the check winner function', () => {
    it('should exist', () => {
      expect(gamelogic.checkWinner).toBe('function');
    });
  });
});
