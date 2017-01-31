import Game from '../game';

const _queue = [];

// key-value pairing of gameId-socket
const _privates = {};

const _connect = ({socket1, socket2, connections}) => {
  const user1 = connections.get(socket1).user;
  const user2 = connections.get(socket2).user;
  new Game({ socket1, socket2, user1, user2 });
};

const joinQueue = ({ socket, connections }) => {
  _queue.push(socket);

  if (_queue.length >= 2) {
    const socket1 = _queue.pop();
    const socket2 = _queue.pop();
    connect({ socket1, socket2, connections });
  }
};

const joinGame = ({ socket, user, connections }, { gameId }) => {
  if (!_privates[gameId]) {
    socket.emit('joinGame.response', {
      success: false,
      message: 'room does not exist',
    });
  } else {
    socket.emit('joinGame.response', {
      success: true,
      message: 'room exists',
    });
    const socket1 = _privates[gameId];
    const socket2 = socket;
    connect({ socket1, socket2, connections });
  }
};

const createGame = ({ socket, connections }, { gameId }) => {
  if (_privates[gameId]) {
    socket.emit('createGame.response', {
      success: false,
      message: 'room already exists',
    });
  } else {
    _privates[gameId] = socket;
    socket.emit('createGame.response', {
      successs: true,
      message: 'created game',
    });
  }
};

const lobbyEvents = {
  joinQueue,
  joinGame,
  createGame,
};

export default lobbyEvents;
