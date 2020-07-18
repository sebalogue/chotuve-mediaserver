class Logger {
  logError(error) {
    console.error(error);
  }

  logWarn(warnMsg) {
    console.log(`[WARN]: ${warnMsg}`);
  }

  logInfo(msg) {
    console.log(`[INFO]: ${msg}`);
  }

  logDebug(debugMsg) {
    console.log(`[DEBUG]: ${debugMsg}`);
  }
}

module.exports = new Logger();
