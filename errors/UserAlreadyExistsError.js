class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Пользователь с таким мылом уже зарегистрирован';
  }
}

module.exports = {
  UserAlreadyExistsError,
};
