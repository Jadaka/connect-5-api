import Game from '../game';

const _queue = [];

const joinQueue = ({ socket, user, connections }) => {
  _queue.push(socket);
  if (_queue.length >= 2) {
    const socket1 = _queue.pop();
    const socket2 = _queue.pop();
    const user1 = connections.get(socket1).user;
    const user2 = connections.get(socket2).user;
    new Game({ socket1, socket2, user1, user2 });
  }
};

const joinGame = () => {

};

const createGame = () => {

}

const lobbyEvents = {
  joinQueue,
  joinGame,
  createGame,
};

export default lobbyEvents;
