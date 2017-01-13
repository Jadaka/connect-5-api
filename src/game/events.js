/**
 *
 *  Events
 *  
 *  Decorates a game class by attaching socket.io listeners
 */
const setupEvents = (game) => {
  game.on('matchFound.response', (player) => {
    player.ready();
    game.start();
  });

  game.on('turnEnd', (player, data) => {
    data.tileId
  })
};
