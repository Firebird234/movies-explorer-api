class NoUpdateDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Введите имя и имэйл';
  }
}

module.exports = {
  NoUpdateDataError,
};
