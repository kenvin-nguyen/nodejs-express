'use strict';
const config = require('config');
const mkdirp = require('mkdirp');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

// create log dir
let appFile = `../log/app-log-%DATE%.log`;
mkdirp(path.dirname(appFile));

let transports=[];
transports.push(new winston.transports.Console({
    level: 'info',
    filename: appFile,
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