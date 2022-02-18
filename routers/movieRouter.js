const movieRouter = require('express').Router();

// const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { postMovie } = require('../controllers/movieControllers/postMovie');
const { getMovies } = require('../controllers/movieControllers/getMovie');
const { deleteMovie } = require('../controllers/movieControllers/deleteMovie');

// const { ValError } = require('../errors/ValError');

movieRouter.post('/movies', postMovie);

movieRouter.get('/movies', getMovies);

movieRouter.delete('/movies/:_id', deleteMovie);

module.exports = movieRouter;
