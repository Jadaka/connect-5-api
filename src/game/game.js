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
    this.p1 = new Player({
      socket: socket1,
      user  : user1,
    });
    this.p2 = new Player({
      socket: socket2,
      user  : user2,
    });

    // game logic
    this.logic = new Gamelogic();
    
    // record moves for stats purposes
    this.moves = [];
  }

  initialize() {
    this.emit('server.');
  }

  emit(event, data) {
    ['p1', 'p2'].forEach(player => this[player].emit(event, data));
  }

  on(event, cb) {
    ['p1', 'p2'].forEach(player => this[player].on(event, cb));
  }
}

export default Game;
