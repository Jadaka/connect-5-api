import Game from '../game';

const _queue = [];
const _privates = {};

const _match = (connections) => {
  const socket1 = _queue.pop();
  const socket2 = _queue.pop();
  const user1 = connections.get(socket1).user;
  const user2 = connections.get(socket2).user;
  new Game({ socket1, socket2, user1, user2 });
};

const joinQueue = ({ socket, connections }) => {
  _queue.push(socket);

  if (_queue.length >= 2) {
    _match(connections);
  }
};

const joinGame = ({ socket, user, connections }, { gameId }) => {
  if (!_privates[gameId]) {
    socket.emit('joinGame.response', {
      success: false,
      message: 'room does not exist',
    });
  }
};

const createGame = () => {
  
};

const lobbyEvents = {
  joinQueue,
  joinGame,
  createGame,
};

export default lobbyEvents;
