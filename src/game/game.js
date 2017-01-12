import Player from './player';
import Gamelogic from './gamelogic';

/**
 *
 *  Game Class
 *
 *  @param {OPTIONS}
 *    socket1: socket.io instance
 *    socket2: socket.io instance
 *    user1  : sequelize user model instance
 *    user2  : sequelize user model instance
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
    this.logic = new Gamelogic();
  }
}

export default Game;
