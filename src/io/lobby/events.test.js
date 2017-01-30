import { each } from 'lodash';

import lobbyEvents from './events';

describe('lobby events', () => {

  it('should contain joinQueue, joinGame, and createGame events', () => {
    [
      'joinQueue',
      'joinGame',
      'createGame'
    ].forEach(eventName => {
      expect(!!lobbyEvents[eventName]).toBe(true);
    });
  });
});
