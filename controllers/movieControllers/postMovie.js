const Movie = require('../../models/movies');
const { ValError } = require('../../errors/ValError');

const { ServerError } = require('../../errors/ServerError');

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
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      }) => res.send({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValError();
      }
      throw new ServerError();
    })
    .catch(next);
};
