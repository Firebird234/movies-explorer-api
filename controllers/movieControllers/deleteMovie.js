const Movie = require('../../models/movies');

const { NotFoundIdError } = require('../../errors/NotFoundIdError');

const { NotCardOwnerError } = require('../../errors/NotCardOwnerError');
const { UserNoundError } = require('../../errors/UserNoundError');

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new UserNoundError();
    })
    .then((card) => {
      console.log('found');
      if (req.user === card.owner.toString()) {
        console.log('if = TRUE');
        return Movie.findByIdAndRemove(req.params._id).then((user) => {
          if (!user) {
            throw new NotFoundIdError();
          }
          const { owner, movieId, nameRu, nameEn } = user;

          return res.send({
            owner,
            movieId,
            nameRu,
            nameEn,
          });
        });
      }
      throw new NotCardOwnerError();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log('catch inside if');
        next(new NotFoundIdError());
      } else {
        console.log('catch outside if');
        next(err);
      }
    });
};
