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
      id    : 1,
      socket: socket1,
      user  : user1,
    });
    this.p2 = new Player({
      id    : 2,
      socket: socket2,
      user  : user2,
    });

    // game logic
    this.logic = new Gamelogic();
    
    // record moves for stats purposes
    this.moves = [];

    // initialize the game
    this.initialize();
  }

  initialize() {
    setupEvents(this);

    // let the clients know that they have been paired up!
    this.emit('matchFound', {
      p1: this.p1,
      p2: this.p2,
    });
    this.on('matchFound.response', ({ player }) => {
      player.ready();
      this.start();
    });
  }

  start() {
    if (this.p1.ready && this.p2.ready) {
      this.emit('gameReady', {
        board: this.logic.board,
      }, [{ playerId: 1 }, { playerId: 2 }]);
    }
  }

  emit(event, data, separate = []) {
    const players = ['p1', 'p2'];
    players.forEach((player, idx) => {
      this[player].emit(event, Object.assign(data, separate[idx] || {}));
    });
  }

  on(event, cb) {
    // every listener callback will be invoked with the game & player within the options (first) parameter
    ['p1', 'p2'].forEach((player) => {
      this[player].on(event, cb.bind(null, { 
        game: this,
        player: this[player],
      }));
    });
  }

  // convenience method to grab the player or opponent of a player
  getOpponent(player) {
    return (this.p1 === player) ? this.p2 : this.p1;
  }
}

export default Game;
