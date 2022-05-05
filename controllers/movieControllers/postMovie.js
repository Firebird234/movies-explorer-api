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
        _id,
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
          _id,
        }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        throw new ValError(valMessage);
      }
      console.log(err);
      throw new ServerError(ServerMessage);
    })
    .catch(next);
};
