import { verify } from 'jsonwebtoken';
import { promisify } from 'bluebird';

import { jwtSecret } from '../config';
import { User } from '../models';

const verifyToken = promisify(verify);

/**
 *
 *  verifyAuth
 *
 *  @param {OBJECT} req - express request object
 *  @param {OBJECT} res - express response object
 *  @param {FN} next - express middleware iterator function
 */
export const isAuthed = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'unauthorized',
    });
    return;
  }
  try {
    const { id } = await verifyToken(token, jwtSecret);
    // attaches the sequelize user instance to the request object for convenience
    req.user = await User.findById(id);
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      res.status(501).json({
        success: false,
        message: 'token expired',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: e.toString(),
    });
  }
};
