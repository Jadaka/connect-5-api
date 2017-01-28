import { verify } from 'jsonwebtoken';
import { each } from 'lodash';

import { User } from '../models';
import { jwtSecret } from '../config';
import lobbyEvents from './lobby/events';

/**
 *
 *  This weak map holds all active socket client instances & their user data
 *
 *  @url {https://goo.gl/nKzWJB}
 */
const connections = new WeakMap();

/**
 *
 *  initSockets
 *
 *  @param {OBJECT} io - socket io server instance
 *
 *  Sets up the socket server instance with middleware & namespacing
 */
export const initSockets = (io) => {
  /**
   *
   *  Authentication middleware
   *
   *  client-side setup:
   *  @url {https://goo.gl/7jMef1}
   */
  io.use(async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      const decoded = await verify(token, jwtSecret);
      if (decoded) {
        // store the socket instance & user instance in the connections map
        const user = await User.findById(decoded.id);
        if (user) {
          connections.set(socket, {
            user,
          });
          console.log('socket connected');
          return next();
        }
        throw new Error('user not found');
      }
    } catch (e) {
      console.log('e = ', e.toString());
      return next(new Error(`Invalid token. Err = ${e.toString()}`));
    }
  });

  io.on('connection', (socket) => {
    /**
     *
     *  Event listeners
     */
    const { user } = connections.get(socket);

    each(lobbyEvents, (event, eventName) => {
      socket.on(eventName, (data) => {
        event({ socket, user, connections }, data);
      });
    });
  });
};
