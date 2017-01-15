import { some, isEqual } from 'lodash';

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

  beforeEach(() => {
    game = new Game({
      user1,
      socket1,
      user2,
      socket2,
    });
  });

  it('should require 2 socket instances and 2 user models', () => {
    expect(() => { new Game({})}).toThrow();
    expect(() => {new Game({ user1: {}, socket1: {} })}).toThrow();
    expect(() => {new Game({ user2: {}, socket2: {} })}).toThrow();
  });

  it('should create player instances and store them', () => {
    expect(game.p1 instanceof Player).toBe(true);
    expect(game.p2 instanceof Player).toBe(true);
  });

  it('should instantiate a new gamelogic instance and store it', () => {
    expect(game.logic instanceof Gamelogic).toBe(true);
  });

  it('should hold a moves array to store played moves', () => {
    expect(Array.isArray(game.moves)).toBe(true);
  });

  it('should have an emit method that invokes emit on both clients', () => {
    const data = { hello: 'world' };
    game.emit('hello', data);

    const iteratee = args => isEqual(args, [ 'hello', data ]);
    const argsFound1 = some(socket1.emit.mock.calls, iteratee);
    const argsFound2 = some(socket2.emit.mock.calls, iteratee);

    expect(typeof game.emit).toBe('function');
    expect(argsFound1).toBe(true);
    expect(argsFound2).toBe(true);
  });

  it('should have an on method that invokes "on" on both clients', () => {
    const fn = () => {};
    game.on('wazzah', fn);
    expect(typeof game.on).toBe('function');
    expect(socket1.on.mock.calls.length > 0).toBe(true);
    expect(socket2.on.mock.calls.length > 0).toBe(true);
  });
});
