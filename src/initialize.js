import cors from 'cors';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import { each } from 'lodash';

import sequelize from './db';
import { initSockets } from './io';
import { customValidators } from './services/validation';
import routes from './routes';

/**
 *
 *  initialize
 *
 *  @param {OBJECT} options - contains:
 *    - express instance
 *    - server instance
 *    - socket.io server instance
 *
 *  Sets up the express instance with middleware functions
 */
const initialize = async ({ app, io }) => {
  try {
    // express standards
    app.use(bodyParser.json());
    app.use(expressValidator({
      customValidators
    }));

    // express routes
    each(routes, (controller, route) => {
      app.use(route, controller);
    });

    // setup sockets
    initSockets(io);

    await sequelize.authenticate();
  } catch (err) {
    console.error(`App failed to start. error = ${err.toString()}`);
  }
};

export default initialize;
