import Sequelize from 'sequelize';
import { promisify } from 'bluebird';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { pick } from 'lodash';

import sequelize from '../db';
import { jwtSecret } from '../config';

const hashPassword = promisify(hash);
const comparePassword = promisify(compare);
const signToken = promisify(sign);

const User = sequelize.define('users', {
  username: {
    type     : Sequelize.STRING,
    allowNull: false,
    unique   : true,
  },
  email: {
    type     : Sequelize.STRING,
    allowNull: false,
    validate : {
      isEmail: true,
    },
  },
  password: {
    type     : Sequelize.STRING,
    allowNull: false,
  },
}, {
  getterMethods: {
    getData: function() {
      return pick(this.dataValues, [
        'username',
        'email',
      ]);
    },
  },
  /**
   *
   *  We use hooks for injecting required tasks to model events to conceal necessary
   *  tasks for database related calls, such as hashing a password before creating
   *  a user entry.
   *
   *  Each hook behaves synchronously unless we define a second 'cb' parameter OR
   *  return a promise.
   *
   *  If asynchronous, the next lifecycle event will wait until the 'cb' is called,
   *  or the returned promise is resolved/rejected.
   *
   */
  hooks: {
    beforeCreate: async (user) => {
      try {
        user.password = await hashPassword(user.password, 2);
        return sequelize.Promise.resolve(user);
      } catch (e) {
        return sequelize.Promise.reject(e);
      }
    },
  },
  // instanceMethods are convenient for giving our model instances common tasks
  instanceMethods: {
    /**
     *
     *  checkPassword: Promise<boolean>
     *
     *  comparePassword is a promisifed version of the bcrypt.compare function
     *  it resolves to a boolean value.
     *
     *  @url https://www.npmjs.com/package/bcrypt#to-check-a-password
     */
    checkPassword: (inputPass, hashedPass) => comparePassword(inputPass, hashedPass),

    /**
     *
     *  getToken: Promise<string>
     */
    getToken: async function() {
      const { id, email } = this;
      try {
        const token = await signToken({
          id,
          email,
        }, jwtSecret, {
          expiresIn: '7d',
        });
        return token;
      } catch (e) {
        throw new Error('error generating token');
      }
    },
  },
});

export default User;
