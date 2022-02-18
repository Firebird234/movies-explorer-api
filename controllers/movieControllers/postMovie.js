const Movie = require('../../models/movies');
const { ValError } = require('../../errors/ValError');

const { ServerError } = require('../../errors/ServerError');

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    image,
    trailerLink,
    thumbNail,
    movieId,
    nameRu,
    nameEn,
  } = req.body;

  const owner = req.user;
  console.log('HEHE', owner);
  Movie.create({
    country,
    director,
    duration,
    year,
    image,
    trailerLink,
    thumbNail,
    owner,
    movieId,
    nameRu,
    nameEn,
  })
    .then(
      ({
        country,
        director,
        duration,
        year,
        image,
        trailerLink,
        thumbNail,
        owner,
        movieId,
        nameRu,
        nameEn,
      }) =>
        res.send({
          country,
          director,
          duration,
          year,
          image,
          trailerLink,
          thumbNail,
          owner,
          movieId,
          nameRu,
          nameEn,
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
