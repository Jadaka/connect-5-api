import Player from './player';

describe('the player class', () => {
  let player;
  const mockSocket = {};
  const mockModel = {};

  beforeEach(() => {
    player = new Player({
      socket: mockSocket,
      model: mockModel
    });
  });

  it('stores a socket and model object', () => {
    expect(player.socket).toBe(mockSocket);
    expect(player.model).toBe(mockModel);
  });
});
