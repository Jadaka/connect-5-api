import Player from './player';

let player;
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};
const mockUser = {
  update: jest.fn(),
};

describe('the player instance', () => {
  it('stores a socket and user object', () => {
    const socket = Object.assign({}, mockSocket);
    const user = Object.assign({}, mockSocket);
    player = new Player({
      socket,
      user,
    });
    expect(player.socket).toBe(socket);
    expect(player.user).toBe(user);
  });

  it('throws when a socket and user are not provided', () => {
    expect(() => new Player({})).toThrow();
    expect(() => new Player({ socket: {} })).toThrow();
    expect(() => new Player({ user: {} })).toThrow();
  });
});

describe('the win function', () => {
  beforeEach(() => {
    player = new Player({
      socket: Object.assign({}, mockSocket),
      user : Object.assign({}, mockUser),
    });
  });

  it('exists', () => {
    expect(typeof player.win).toBe('function');
  });

  it('updates the user when called', () => {
    player.win();
    expect(player.user.update).toHaveBeenCalled();
  })
});

describe('the lose function', () => {
  beforeEach(() => {
    player = new Player({
      socket: Object.assign({}, mockSocket),
      user : Object.assign({}, mockUser),
    });
  });

  it('exists', () => {
    expect(typeof player.lose).toBe('function');
  });

  it('updates the user when called', () => {
    player.lose();
    expect(player.user.update).toHaveBeenCalled();
  })
})
