var logicjwt = require('../logic_jwt_authen');
var CONSTANTS = require('../constant');
const logger = require('../../helpers/logger');

function isAuthenticated() {
    return function(req, res, next) {
    if (!req.isAuthenticated()){
        logger.log({level: 'error', message: 'access no login' });
        res.status(CONSTANTS.UNAUTHORIZED_CODE).json({
            'err': 'no login'
        });
    }
    else {
        next();
    }
    };
};

function isAuthenticatedInToken() {
    return function(req, res, next) {

        let token = (req.query && req.query.AccessToken) || (req.body && req.body.AccessToken) || req.headers['Authorization'] || req.headers['authorization'] || req.headers['x-access-token'] || req.headers['access-token'];
        if (token) {
            let bearerString = "Bearer ";
            if (token.indexOf(bearerString) == 0) {
                token = token.replace(/Bearer\s+/g, '');
                token = token.replace(/\"/g, '');
            }
            
            let decode = logicjwt.decodeToken(token);
            if(decode === null) {
                logger.log({level: 'error', message: 'access by invalid token' });
                res.status(CONSTANTS.UNAUTHORIZED_CODE).json({
                    'err': 'Invalid token'
                });
            }
            else if(!decode.UserId) {
                logger.log({level: 'error', message: 'access no login' });
                res.status(CONSTANTS.UNAUTHORIZED_CODE).json({
                    'err': 'No login'
                });
            }
            else {
                next();
            }
        }
    };
}

module.exports = {
    isAuthenticated,
    isAuthenticatedInToken
}