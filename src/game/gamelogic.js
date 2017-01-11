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
    // _dict is a key-value pairing of letter to numbers (a=0 ... s=19)
    this._dict = 'abcdefghijklmnopqrs'.split('').reduce((dict, letter, idx) => {
      dict[letter] = idx;
      return dict;
    }, {});
    this._lastplayed = null;
    this._lastplayer = null;
    
    // create 19 inner arrays
    for (var i = 0; i < 19; i++) {
      let row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.board.push(row);
    }
  }

  set(id, player) {
    if (player !== 1 && player !== 2) {
      throw new Error('set() should only be called with a tile ID and playerId (1 or 2)');
    }
    const [row, col] = this._idToCoords(id);
    // if the tile is already taken
    if (this.board[row][col]) {
      throw new Error('set() was called for an already occupied tile. id = ', id);
    }
    this.board[row][col] = player;
    this._lastplayed = id;
    this._lastplayer = player;
    return true;
  }

  _idToCoords(id) {
    const row = this._dict[id[0]];
    const col = this._dict[id[1]];
    if (row === undefined || col === undefined) {
      throw new Error('invalid ID passed into _idToCoords');
    }
    return [row, col];
  }

  _checkWinner() {
    /**
     *
     *  _checkWinner: BOOLEAN
     *
     *  Utility function which returns a boolean for whether there is a winning player or not
     *  It also overwrites the winner property of this logic instance when a winner is found
     */
  }

  _checkRow(row, col) {
    const count = 1;
    const origCol = col;
    while (this.board[row][++col] === id) {
      count++;
      col--;
    }
    col = origCol;
    while (this.board[row][--col] === id) {
      count++;
      col++;
    }
    return count >= 5;
  }

  _checkCol(row, col) {
    const count = 1;
    const origRow = row;
    while (this.board[++row] && this.board[row][col] === id) {
      count++;
    }
    row = origRow;
    while (this.board[--row] && this.board[row][col] === id) {
      count++;
    }
    return count >= 5;
  }

  _checkMajorDiagnol(row, col) {
    const count = 1;
    const orig = [row, col];
    while (this.board[row + 1] && this.board[++row][++col] === id) {
      count++;
    }
    [row, col] = orig;
    while (this.board[row - 1] && this.board[--row][--col] === id) {
      count++;
    }
    return count >= 5;
  }

  _checkMinorDiagnol(row, col) {
    const count = 1;
    const orig = [row, col];
    while (this.board[row + 1] && this.board[++row][--col] === id) {
      count++;
    }
    [row, col] = orig;
    while (this.board[row - 1] && this.board[--row][++col] === id) {
      count++;
    }
    return count >= 5;
  }


}

export default Gamelogic;
