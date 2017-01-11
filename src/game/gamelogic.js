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
    this._winner = null;
    // _dict is a key-value pairing of letter to numbers (a=0 ... s=19)
    this._dict = 'abcdefghijklmnopqrs'.split('').reduce((dict, letter, idx) => {
      dict[letter] = idx;
      return dict;
    }, {});
    
    // create 19 inner arrays
    for (var i = 0; i < 19; i++) {
      let row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.board.push(row);
    }
  }

  getWinner() {
    return this._winner;
  }

  set(id) {
    
  }

  _checkWinner() {

  }

  _idToTile() {

  }
}

export default Gamelogic;
