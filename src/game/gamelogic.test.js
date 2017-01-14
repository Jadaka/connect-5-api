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
    expect(gamelogic.dict.a).toBe(0);
    expect(gamelogic.dict.e).toBe(4);
    expect(gamelogic.dict.s).toBe(18);
  });

  describe('the idToCoords function', () => {
    it('should exist', () => {
      expect(typeof gamelogic.idToCoords).toBe('function');
    });

    it('should error handle', () => {
      expect(() => {gamelogic.idToCoords('za')}).toThrow();
      expect(() => {gamelogic.idToCoords('az')}).toThrow();
    });

    it('should return the correct coordinates', () => {
      expect(gamelogic.idToCoords('aa')).toEqual([0, 0]);
      expect(gamelogic.idToCoords('cc')).toEqual([2, 2]);
      expect(gamelogic.idToCoords('gb')).toEqual([6, 1]);
      expect(gamelogic.idToCoords('ds')).toEqual([3, 18]);
    });
  })

  describe('the set function', () => {
    it('should exist', () => {
      expect(typeof gamelogic.set).toBe('function');
    });

    it('should error handle', () => {
      expect(() => { gamelogic.set() }).toThrow();
      expect(() => { gamelogic.set('ss', 0) }).toThrow();
      expect(() => { gamelogic.set('aa', 3) }).toThrow();
      expect(() => { 
        gamelogic.set('aa', 1);
        gamelogic.set('aa', 2);
      }).toThrow();
    });

    it('should change board state correctly', () => {
      gamelogic = new Gamelogic();
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

    it('should update the lastplayed and lastplayer property', () => {
      gamelogic = new Gamelogic();
      gamelogic.set('ss', 1);
      expect(gamelogic.lastplayed).toBe('ss');
      expect(gamelogic.lastplayer).toBe(1);
      gamelogic.set('ee', 2);
      expect(gamelogic.lastplayed).toBe('ee');
      expect(gamelogic.lastplayer).toBe(2);
    })
  });

  describe('the check winner function', () => {

    it('should exist', () => {
      expect(typeof gamelogic.checkWinner).toBe('function');
    });

    it('should return false for a non-winning board', () => {
      expect(gamelogic.checkWinner()).toBe(false);
      [
        ['ef'],
        ['aa', 'ab', 'ac', 'ad'],
        ['aa', 'bb', 'cc', 'dd'],
        ['ab', 'mn', 'bo', 'ss']
      ].forEach(toPlay => {
        gamelogic = new Gamelogic();
        toPlay.forEach(id => gamelogic.set(id, 1));
        expect(gamelogic.checkWinner()).toBe(false);
        it('should not update the winner property', () => {
          expect(gamelogic.winner).toBe(null);
        });
      });
    });

    it('should update the winner for a winning board', () => {
      [
        ['aa', 'ab', 'ac', 'ad', 'ae'],
        ['aa', 'ba', 'ca', 'da', 'ea'],
        ['aa', 'bb', 'cc', 'dd', 'ee'],
        ['df', 'dg', 'dh', 'di', 'dj']
      ].forEach(toPlay => {
        gamelogic = new Gamelogic();
        toPlay.forEach(id => gamelogic.set(id, 1));
        expect(gamelogic.checkWinner()).toBe(true);
        it('should update the winner property', () => {
          expect(gamelogic.winner).toBe(1);
        });
      });
    });
  });
});
