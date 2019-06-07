const {transports, createLogger, format} = require('winston');

    const logger = createLogger({
    level: 'debug',
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
       
            new transports.File({filename: 'error.log', level: 'error'}),
            new transports.File({filename: 'app.log'})
        ]
    });
    module.exports = logger;