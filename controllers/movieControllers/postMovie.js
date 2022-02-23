const Movie = require('../../models/movies');
const { ValError } = require('../../errors/ValError');

const { ServerError } = require('../../errors/ServerError');
const { valMessage, ServerMessage } = require('../../const/constants');

module.exports.postMovie = (req, res, next) => {
  const id = req.user;

  Movie.create({ ...req.body, owner: id })
    .then(
      ({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      }) =>
        res.send({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
          owner,
        }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValError(valMessage);
      }
      throw new ServerError(ServerMessage);
    })
    .catch(next);
};
