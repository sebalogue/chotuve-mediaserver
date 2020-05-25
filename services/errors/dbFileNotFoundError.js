class DbFileNotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = DbFileNotFoundError;
