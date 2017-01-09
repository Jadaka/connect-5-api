/**
 *
 *  Player Class
 *
 *  @param {OBJECT} socket - socket.io instance
 *  @param {OBJECT} user - sequelize user instance
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
}

export default Player;
