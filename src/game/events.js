/**
 *
 *  Events
 *  
 *  Decorates a game instance by attaching socket.io listeners
 */
const setupEvents = (game) => {
  game.on('matchFound.response', (player) => {
    player.ready();
    game.start();
  });

  game.on('turnEnd', (player, data) => {
    if (game.logic.lastPlayerId === player) {
      return player.emit('turnEnd.response', {
        err: 'not your turn yet'
      });
    } else {
      // call gamelogic set (TODO)
      game.emit('turnStart', {
        board: game.logic.board,
        lastPlayed: game.logic.lastPlayerId,
        turn: game.getOpponent(player).id,
      });
    }
  });
};
