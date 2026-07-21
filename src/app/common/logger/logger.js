class Logger {
    // the Logger class must be a singleton, to conserve memory

    constructor() {
        if (!Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = this;
    }

    log(level, message, metadata = {})   {
        const logObj = {
            level: level,
            message: message, 
            timestamp:new Date().toISOString(),
            ...metadata
        }

        // this can then be integrated with the Datadog logger
        console.log(JSON.stringify(logObj));
    }

    info(message, metadata = {}) {
        this.log('info', message, metadata);
    }

    error(message, metadata = {}) {
        this.log('error', message, metadata);
    }

    warn(message, metadata = {}) {
        this.log('warn', message, metadata);
    }

    debug(message, metadata = {}) {
        this.log('debug', message, metadata);
    }
}

const logger = new Logger();
module.exports = logger;