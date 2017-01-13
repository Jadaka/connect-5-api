import Game from './game';
import Player from './player';
import Gamelogic from './gamelogic';

let game;
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};
const mockUser = {
  update: jest.fn(),
};

describe('the game instance', () => {
  let user1 = Object.assign({}, mockSocket);
  let user2 = Object.assign({}, mockSocket);
  let socket1 = Object.assign({}, mockSocket);
  let socket2 = Object.assign({}, mockSocket);
  game = new Game({
    user1,
    socket1,
    user2,
    socket2,
  });

  it('should require 2 socket instances and 2 user models', () => {
    expect(() => { new Game({})}).toThrow();
    expect(() => {new Game({ user1: {}, socket1: {} })}).toThrow();
    expect(() => {new Game({ user2: {}, socket2: {} })}).toThrow();
  });

  it('should create player instances and store them', () => {
    expect(game.player1 instanceof Player).toBe(true);
    expect(game.player2 instanceof Player).toBe(true);
  });

  it('should instantiate a new gamelogic instance and store it', () => {
    expect(game.logic instanceof Gamelogic).toBe(true);
  });

  it('should hold a moves array to store played moves', () => {
    expect(Array.isArray(game._moves)).toBe(true);
  });

  it('should have an emit method that invokes emit on both clients', () => {
    game.emit('hello', {
      hello: 'world'
    });
    expect(typeof game.emit).toBe('function');
    expect(socket1.emit.mock.calls[0]).toEqual([ 'hello', { hello: 'world' } ]);
    expect(socket2.emit.mock.calls[0]).toEqual([ 'hello', { hello: 'world' } ]);
  });

  it('should have an on method that invokes listen on both clients', () => {
    const fn = () => {};
    game.on('wazzah', fn);
    expect(typeof game.on).toBe('function');
    expect(socket1.on.mock.calls[0]).toEqual([ 'wazzah', fn ]);
    expect(socket2.on.mock.calls[0]).toEqual([ 'wazzah', fn ]);
  });
});
