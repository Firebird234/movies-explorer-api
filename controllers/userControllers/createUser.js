// const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/users');

const { UserCreatedError } = require('../../errors/userCreatedError');

const { ServerError } = require('../../errors/ServerError');
const { ValError } = require('../../errors/ValError');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(1);
  // if (!validator.isEmail(email)) {
  //   return res.status(400).send({
  //     message: 'ИМЭЙЛ - НЕ ИМЭЙЛ, ВНИМАТЕЛЬНЕЕ',
  //   });
  // }
  return bcrypt
    .hash(password, 10)
    .then((password) => {
      console.log(2);
      return User.create({
        name,
        email,
        password,
      });
    })
    .then(({ name, email, password }) => {
      console.log(3);
      res.send({
        name,
        email,
        password,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        console.log(4);
        throw new ValError();
      }
      if (err.code === 11000) {
        console.log(5);
        throw new UserCreatedError();
      }
      console.log(6);
      throw new ServerError();
    })
    .catch(next);
};
