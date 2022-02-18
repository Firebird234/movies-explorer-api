const Movie = require('../../models/movies');

const { ServerError } = require('../../errors/ServerError');

module.exports.getMovies = (req, res, next) => {
  Movie.find()
    .then((user) => {
      console.log(req.user, user.owner, user);

      const movieArr = user.filter((el) => el.owner.toString() === req.user);

      if (movieArr.length) {
        return res.send(movieArr);
      }
      return res.send({
        message: 'У вас пока нет фильмов',
      });
    })
    .catch(() => {
      throw new ServerError();
    })
    .catch(next);
};
