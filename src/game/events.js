import { each } from 'lodash';

/**
 *
 *  Event handlers for socket events
 *
 */
const turnEnd = ({ game, player }, data) => {
  const logic = game.logic;
  if (logic.lastPlayerId === player) {
    player.emit('turnEnd.response', {
      success: false,
      err    : 'not your turn',
    });
    return;
  }

  try {
    logic.set(data.tileId, player.id);
    game.moves.push(data.tileId);
    
    const { board, lastPlayed, winner } = logic;
    const turn = game.getOpponent(player).id;

    if (logic.checkWinner()) {
      game.emit('gameEnded', { board, lastPlayed, winner });
    } else {
      game.emit('turnStart', { board, lastPlayed, turn });
    }
  } catch (e) {
    console.error('error in event: "turnEnd"');
    console.error(e);
  }
};

const events = {
  turnEnd,
};

export default (game) => {
  // decorate our game instances with each listener
  each(events, (cb, event) => {
    game.on(event, cb);
  });
};
