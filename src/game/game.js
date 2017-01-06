import Player from './player';

/**
 *
 *  Game Class
 *
 *  @param {OBJECT} socket1 - socket.io instance
 *  @param {OBJECT} socket2 - socket.io instance
 *
 */
class Game {
  constructor() {
    this.player1 = new Player(socket1);
    this.player2 = new Player(socket2);
  }
}

export default Game;
