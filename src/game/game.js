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
  constructor({ user1, socket1, user2, socket2 }) {
    this.player1 = new Player({ 
      socket: socket1,
      user: user1
    });
    this.player2 = new Player({ 
      socket: socket2,
      user: user2
    });
  }
}

export default Game;
