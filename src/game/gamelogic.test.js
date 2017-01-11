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

  it('should contain a dictionary of letter to integer pariings', () => {
    expect(gamelogic._dict.a).toBe(0);
    expect(gamelogic._dict.e).toBe(4);
    expect(gamelogic._dict.s).toBe(18);
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
      expect(gamelogic._checkWinner).toBe('function');
    });

    it('should return null for a non-winning board', () => {
      expect(gamelogic._checkWinner()).toBe(null);
      [
        ['ef'],
        ['aa', 'ab', 'ac', 'ad'],
        ['aa', 'bb', 'cc', 'dd'],
        ['ab', 'mn', 'bo', 'ss']
      ].forEach(toPlay => {
        gamelogic = new Gamelogic();
        toPlay.forEach(id => gamelogic.set(id, 1));
        expect(gamelogic.checkWinner()).toBe(null);
      });
    });
  });
});
