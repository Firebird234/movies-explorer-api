const movieRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { postMovie } = require('../controllers/movieControllers/postMovie');
const { getMovies } = require('../controllers/movieControllers/getMovie');
const { deleteMovie } = require('../controllers/movieControllers/deleteMovie');

const { ValError } = require('../errors/ValError');

movieRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .custom((value) => {
          if (
            !validator.isURL(value, {
              require_protocol: true,
            })
          ) {
            throw new ValError();
          }
          return value;
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value) => {
          if (
            !validator.isURL(value, {
              require_protocol: true,
            })
          ) {
            throw new ValError();
          }
          return value;
        }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string()
        .required()
        .custom((value) => {
          if (
            !validator.isURL(value, {
              require_protocol: true,
            })
          ) {
            throw new ValError();
          }
          return value;
        }),
      movieId: Joi.number(),
    }),
  }),
  postMovie,
);

movieRouter.get('/movies', getMovies);

movieRouter.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
