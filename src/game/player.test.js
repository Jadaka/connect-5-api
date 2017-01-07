import Player from './player';

let player;
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};
const mockModel = {
  update: jest.fn(),
};

describe('the player instance', () => {
  it('stores a socket and model object', () => {
    const socket = Object.assign({}, mockSocket);
    const model = Object.assign({}, mockSocket);
    player = new Player({
      socket,
      model,
    });
    expect(player.socket).toBe(socket);
    expect(player.model).toBe(model);
  });

  it('throws when a socket and model are not provided', () => {
    expect(() => new Player({})).toThrow();
    expect(() => new Player({ socket: {} })).toThrow();
    expect(() => new Player({ model: {} })).toThrow();
  });
});

describe('the win function', () => {
  beforeEach(() => {
    player = new Player({
      socket: Object.assign({}, mockSocket),
      model : Object.assign({}, mockModel),
    });
  });

  it('exists', () => {
    expect(typeof player.win).toBe('function');
  });

  it('updates the model when called', () => {
    player.win();
    expect(player.model.update).toHaveBeenCalled();
  })
});

describe('the lose function', () => {
  beforeEach(() => {
    player = new Player({
      socket: Object.assign({}, mockSocket),
      model : Object.assign({}, mockModel),
    });
  });

  it('exists', () => {
    expect(typeof player.lose).toBe('function');
  });

  it('updates the model when called', () => {
    player.lose();
    expect(player.model.update).toHaveBeenCalled();
  })
})
