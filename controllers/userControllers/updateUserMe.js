const User = require('../../models/users');

const { ValError } = require('../../errors/ValError');
const { UserNoundError } = require('../../errors/UserNoundError');

const { NoUpdateDataError } = require('../../errors/NoUpdateDataError');
const { UserAlreadyExistsError } = require('../../errors/UserAlreadyExistsError');
const {
  noUpdateDataMessage,
  userAlreadyExistsMessage,
  valMessage,
  userNoundMessage,
} = require('../../const/constants');

module.exports.updateUserMe = (req, res, next) => {
  const me = req.user;
  if (!req.body.name || !req.body.email) {
    return next(new NoUpdateDataError(noUpdateDataMessage));
  }

  return User.findOne({ email: req.body.email }).then((existingUser) => {
    console.log('bobo', existingUser);
    if (existingUser) {
      return next(new UserAlreadyExistsError(userAlreadyExistsMessage));
    }
    return User.findByIdAndUpdate(me, req.body, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
      .then((user) => {
        if (!user) {
          return next(new UserNoundError(userNoundMessage));
        }
        const { email, name } = user;
        console.log(name);
        return res.send({
          email,
          name,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValError(valMessage));
        } else {
          next(err);
        }
      });
  });
};
