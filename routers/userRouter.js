const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { getUser } = require('../controllers/userControllers/getUser');
const { updateUserMe } = require('../controllers/userControllers/updateUserMe');
// const { ValError } = require('../errors/ValError');

userRouter.get(
  '/users/me',
  // celebrate({
  //   params: Joi.object().keys({
  //     userId: Joi.string().length(24).hex(),
  //   }),
  // }),
  getUser,
);

userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserMe,
);

module.exports = userRouter;
