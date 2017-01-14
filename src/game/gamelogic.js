import { some } from 'lodash';

/**
 *
 *  Gamelogic Constructor
 *
 *  Game logic instances are primary used to maintain board state of each game.
 *
 */
class Gamelogic {
  constructor() {
    this.board = [];
    this.winner = null;

    // cache the last move for quicker processing
    this.lastPlayed = null;
    this.lastPlayerId = null;

    // dict is a key-value pairing of letter to numbers (a=0 ... s=19)
    this.dict = 'abcdefghijklmnopqrs'.split('').reduce((dict, letter, idx) => {
      dict[letter] = idx;
      return dict;
    }, {});
    
    // create 19 inner arrays
    for (let i = 0; i < 19; i++) {
      this.board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  set(id, playerId) {
    if (playerId !== 1 && playerId !== 2) {
      throw new Error('set() should only be called with a tile ID and playerId (1 or 2)');
    }
    const [row, col] = this.idToCoords(id);
    // if the tile is already taken
    if (this.board[row][col]) {
      throw new Error('set() was called for an already occupied tile. id = ', id);
    }
    this.board[row][col] = playerId;
    this.lastPlayed = id;
    this.lastPlayerId = playerId;
    return true;
  }

  idToCoords(id) {
    const row = this.dict[id[0]];
    const col = this.dict[id[1]];
    if (row === undefined || col === undefined) {
      throw new Error('invalid ID passed into idToCoords');
    }
    return [row, col];
  }

  checkWinner() {
    /**
     *
     *  checkWinner: BOOLEAN
     *
     *  Utility function which returns a boolean for whether there is a winning player or not
     *  It also overwrites the winner property of this logic instance when a winner is found
     */
    const [row, col] = this.idToCoords(this.lastPlayed);
    const winners = ['checkRow', 'checkCol', 'checkMajor', 'checkMinor'].map((toCheck) => {
      const result = this[toCheck](row, col);
      if (result) {
        this.winner = this.lastPlayerId;
      }
      return result;
    });
    return some(winners);
  }

  checkRow(row, col) {
    const origCol = col;
    let count = 1;
    while (this.board[row][++col] === this.lastPlayerId) {
      count++;
    }
    col = origCol;
    while (this.board[row][--col] === this.lastPlayerId) {
      count++;
    }
    return count >= 5;
  }

  checkCol(row, col) {
    const origRow = row;
    let count = 1;
    while (this.board[++row] && this.board[row][col] === this.lastPlayerId) {
      count++;
    }
    row = origRow;
    while (this.board[--row] && this.board[row][col] === this.lastPlayerId) {
      count++;
    }
    return count >= 5;
  }

  checkMajor(row, col) {
    const orig = [row, col];
    let count = 1;
    while (this.board[row + 1] && this.board[++row][++col] === this.lastPlayerId) {
      count++;
    }
    [row, col] = orig;
    while (this.board[row - 1] && this.board[--row][--col] === this.lastPlayerId) {
      count++;
    }
    return count >= 5;
  }

  checkMinor(row, col) {
    const orig = [row, col];
    let count = 1;
    while (this.board[row + 1] && this.board[++row][--col] === this.lastPlayerId) {
      count++;
    }
    [row, col] = orig;
    while (this.board[row - 1] && this.board[--row][++col] === this.lastPlayerId) {
      count++;
    }
    return count >= 5;
  }
}

export default Gamelogic;
