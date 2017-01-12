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
});
