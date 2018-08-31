var express = require('express');
var user_router = express.Router();
var userlogic = require('./user_logic');
const logger = require('../helpers/logger');

const test_account = { username: 'kevin', password: '123456'};

const passport = require('./security/passport.js');

login = async(req, res) =>{
    try {
        var postdata = req.body;
        const user = await userlogic.getUserByUsername(postdata.username);
        if(postdata.username == user.username && postdata.password == user.password){
            res.status(200).send('login susscessful!');
        }
        else{
            res.status(500).send('login fail!')
        }
    } catch (error) {
        logger.log({level: 'error', message: error });
        res.status(500).send('Server internal error!');
    }
    
}

ppLogin =  (req, res, next) => {
    passport.authenticate('local-login',
        (err, user) => {
            if (err) {
                res.status(500).send('Something is wrong.');
            }
            else if (!user) {
                res.status(500).send('Username or pass is wrong.');
            } else {
                req.login(user, err => {
                    if (err) {
                        res.status(500).send('Something is wrong.');
                    } else {
                        res.json(req.user);
                    }
                });
            }
    })(req, res, next);
}

ppSignup = (req, res, next) => {
    passport.authenticate('local-signup',
    (err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            req.login(user, err => {
                if (err) {
                   
                    res.status(500).send('Something is wrong.');
                } else {
                    res.json(req.user);
                }
            });
        }
    })(req, res, next);
};

user_router.post('/login', login);
user_router.post('/pplogin', ppLogin);
user_router.post('/ppsignup', ppSignup);
 module.exports = user_router;