class DbError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = DbError;
