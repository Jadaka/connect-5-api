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
    this._dict = 'abcdefghijklmnopqrs'.split('');

    // create 19 inner arrays
    for (var i = 0; i < 19; i++) {
      let row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.board.push(row);
    }
  }

  getWinner() {
    return this._winner;
  }

  set() {
    
  }

  _idToTile() {

  }
}

export default Gamelogic;
