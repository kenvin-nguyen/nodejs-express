'use strict';
const config = require('config');
const mkdirp = require('mkdirp');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

// create log dir
let appLogFile = `./log/app-log-%DATE%.log`;
mkdirp(path.dirname(appLogFile));

let transports=[];
transports.push(new winston.transports.DailyRotateFile({
    level: 'info',
    filename: appLogFile,
    datePattern: 'DDMMYYYY',
    handleExceptions: true,
    colorize: false,
    prepend: true,
    json: false
}));
//socketNS.replace(' ','')
if (['dev','local '].includes(process.env.NODE_ENV.replace(' ',''))) {
    transports.push(new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        colorize: true,
        json: false
    }));
}

module.exports = winston.createLogger({
    transports: transports,
    exitOnError: false
});