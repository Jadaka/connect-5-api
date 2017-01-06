/**
 *
 *  Player Class
 *
 *  @param {OBJECT} socket - socket.io instance
 */
class Player {
  constructor({ socket, model }) {
    this.socket = socket;
    this.model = model;
  }
}

export default Player;
