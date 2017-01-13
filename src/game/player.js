/**
 *
 *  Player Class
 *
 *  @param {OBJECT} options
 *    socket: socket.io instance
 *    user  : sequelize user instance
 *
 */
class Player {
  constructor({ socket, user }) {
    if (!socket || !user) {
      throw new Error('Both socket and user objects are required for Player instantiations');
    }
    this.socket = socket;
    this.user = user;
  }

  win() {
    this.user.update();
  }

  lose() {
    this.user.update();
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }
}

export default Player;
