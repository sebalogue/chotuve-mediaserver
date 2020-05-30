class UnhandledFirebaseError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = UnhandledFirebaseError;
