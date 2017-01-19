import { isRequestInvalid } from '../services/validation';
import { User } from '../models';

/**
 *
 *  @route /api/auth/signIn
 *
 *  @method {POST}
 *
 *  @body {
 *    username: STRING,
 *    password: STRING
 *  }
 */
export const signIn = async (req, res) => {
  req.checkBody('username', 'Please provide a username').notEmpty();
  req.checkBody('password', 'Please provide a password').notEmpty();
  if (await isRequestInvalid(req, res)) {
    return;
  }
  try {
    const { username, password } = req.body;
    const user = await User.find({ where: { username } });
    if (user && await user.checkPassword(password, user.password)) {
      res.json({
        success: true,
        token  : await user.getToken(),
      });
      return;
    }
    res.status(401).json({
      success: false,
      err    : 'invalid username or password',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};

/**
 *
 *  @route /api/auth/signUp
 *
 *  @method {POST}
 *
 *  @body {
 *    username: STRING,
 *    password: STRING,
 *    email   : STRING,
 *  }
 */
export const signUp = async (req, res) => {
  req.checkBody('username', 'Please provide a username').notEmpty();
  req.checkBody('password', 'Please provide a password').notEmpty();
  req.checkBody('email', 'Please provide an email address').notEmpty().isEmail();
  if (await isRequestInvalid(req, res)) {
    return;
  }

  try {
    const { username, password, email } = req.body;
    let user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(409).json({
        success: false,
        err    : 'username already exists',
      });
    }
    user = await User.create({
      username,
      password,
      email,
    });
    res.json({
      success: true,
      token  : await user.getToken(),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      err    : e.toString(),
    });
  }
};
