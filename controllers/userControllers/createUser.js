// const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/users');

const { UserCreatedError } = require('../../errors/userCreatedError');

const { ServerError } = require('../../errors/ServerError');
const { ValError } = require('../../errors/ValError');
const { userCreatedMessage, ServerMessage, valMessage } = require('../../const/constants');

module.exports.createUser = (req, res, next) => {
  // const { name, email, password } = req.body;
  console.log(1);
  // if (!validator.isEmail(email)) {
  //   return res.status(400).send({
  //     message: 'ИМЭЙЛ - НЕ ИМЭЙЛ, ВНИМАТЕЛЬНЕЕ',
  //   });
  // }
  return bcrypt
    .hash(req.body.password, 10)
    .then((pass) => {
      console.log(2);
      return User.create({
        ...req.body,
        password: pass,
      });
    })
    .then(({ name, email }) => {
      console.log(3);
      res.send({
        name,
        email,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        console.log(err);
        throw new ValError(valMessage);
      }
      if (err.code === 11000) {
        console.log(err);
        throw new UserCreatedError(userCreatedMessage);
      }
      console.log(err);
      throw new ServerError(ServerMessage);
    })
    .catch(next);
};
