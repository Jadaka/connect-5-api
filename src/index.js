import { Server } from 'http';
import express from 'express';
import Io from 'socket.io';

import initialize from './initialize';

const app = Express();
const server = Server(app);
const io = Io(server);

const PORT = process.env.PORT || 3001;

(async () => {
  await initialize({
    server,
    app,
    io
  });

  server.listen(PORT);
  console.log(`app listening on port ${PORT}`);
})();
