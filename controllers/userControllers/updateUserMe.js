const User = require('../../models/users');

const { ValError } = require('../../errors/ValError');
const { UserNoundError } = require('../../errors/UserNoundError');

module.exports.updateUserMe = (req, res, next) => {
  const me = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    me,
    {
      email,
      name,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return next(new UserNoundError());
      }
      const { email, name } = user;
      return res.send({
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValError());
      } else {
        next(err);
      }
    });
};
