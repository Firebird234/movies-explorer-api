const User = require('../../models/users');

const { UserNoundError } = require('../../errors/UserNoundError');
const { NotFoundIdError } = require('../../errors/NotFoundIdError');
const { userNoundMessage, notFoundIdMessage } = require('../../const/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new UserNoundError(userNoundMessage);
      }
      const { name, email } = user;
      return res.send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundIdError(notFoundIdMessage));
      } else {
        next(err);
      }
    });
};
