/**
 *
 *  Player Class
 *
 *  @param {OBJECT} socket - socket.io instance
 */
class Player {
  constructor({ socket, model }) {
    if (!socket || !model) {
      throw new Error('Both socket and model objects are required for Player instantiations');
    }
    this.socket = socket;
    this.model = model;
  }

  win() {

  }

  lose() {

  }
}

export default Player;
