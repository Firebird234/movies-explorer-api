const { JWT_SECRET, NODE_ENV } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');

const { IncorrectTokenError } = require('../../errors/incorrectTokenError');
const { secretKeyDev } = require('../../const/config');
const { incorrectTokenMessage } = require('../../const/constants');

const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : secretKeyDev;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  })
    .select('+password')
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }
      req.userId = data._id;
      return bcrypt.compare(password, data.password);
    })
    .then((passed) => {
      console.log(jwtKey);
      if (!passed) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }

      const id = req.userId;
      const token = jwt.sign(
        {
          id,
        },
        jwtKey,
        {
          expiresIn: 3600 * 24 * 7,
        },
      );
      console.log('login', token);
      return res.status(200).send({
        token,
        id,
      });
    })
    .catch(() => {
      console.log(jwtKey);
      throw new IncorrectTokenError(incorrectTokenMessage);
    })
    .catch(next);
};
