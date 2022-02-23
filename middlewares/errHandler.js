module.exports.errHandler = (err, req, res, next) => {
  res.status(err.statusCode === undefined ? 500 : err.statusCode).send({
    message: `${err.message} thats it`,
  });
  next();
};
