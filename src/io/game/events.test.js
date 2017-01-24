import setupEvents from './events';

let game = {
  on: jest.fn(),
  emit: jest.fn(),
};

describe('the setupEvents game decorator', () => {
  it('should decorate a game instance with some events', () => {
    setupEvents(game);

    expect(!!game.on.mock.calls.length).toBe(true);
  });
});
