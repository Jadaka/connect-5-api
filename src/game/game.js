import Player from './player';
import Gamelogic from './gamelogic';
import setupEvents from './events';

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

    // keep track of who's turn it is
    this.turn = null;

    // game logic
    this.logic = new Gamelogic();
    
    // record moves for stats purposes
    this.moves = [];

    // initialize the app
    this.initialize();
  }

  initialize() {
    setupEvents(this);

    this.emit('matchFound', {
      p1: this.p1,
      p2: this.p2,
    });
  }

  start() {
    if (this.p1.ready && this.p2.ready) {
      this.emit('gameReady', {
        board: this.logic.board,
      }, [ { playerId: 1 }, { playerId: 2 } ]);
    }
  }

  emit(event, data, separate) {
    const players = ['p1', 'p2'];
    if (!separate) {
      players.forEach((player) => {
        this[player].emit(event, data)
      });
    } else {
      players.forEach((player, idx) => {
        this[player].emit(event, Object.assign(data, separate[idx]))
      });
    }
  }

  on(event, cb) {
    ['p1', 'p2'].forEach(player => this[player].on(event, cb.bind(null, this[player])));
  }

  // convenience method to grab the player or opponent of a player
  getOpponent(player) {
    return (this.p1 === player) ? this.p2 : this.p1;
  }
}

export default Game;
