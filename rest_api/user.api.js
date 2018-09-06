var express = require('express');
var user_router = express.Router();
var userlogic = require('./logic_user');
const logger = require('../helpers/logger');
const passport = require('./security/passport.js');
const auth = require('./security/auth');
const logicjwt = require('./logic_jwt_authen');

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
                res.status(500).send(err);
            }
            else if (!user) {
                res.status(500).send('Username or pass is wrong.');
            } else {
                // req.login(user, err => {
                //     if (err) {
                //         res.status(500).send('Something is wrong.');
                //     } else {
                //         delete req.user.password;
                //         res.json(req.user);
                //     }
                // });

                res.json(logicjwt.createLoginTokenRes(user));
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
            // req.login(user, err => {
            //     if (err) {
                   
            //         res.status(500).send('Something is wrong.');
            //     } else {
            //         res.json(req.user);
            //     }
            // });
            res.json(logicjwt.createLoginTokenRes(user));
        }
    })(req, res, next);
};

logout = (req, res) => {
    req.logout();
    res.json('logout');
};

getUser = async(req, res) =>{
    try {
        const user = await userlogic.findById(req.params.id);
        res.json(user);
    } catch (error) {
        logger.log({level: 'error', message: error });
        res.status(500).send('Server internal error!');
    }
}

user_router.post('/login', login);
user_router.get('/logout', logout);
user_router.post('/pplogin', ppLogin);
user_router.post('/ppsignup', ppSignup);
user_router.get('/:id', auth.isAuthenticatedInToken(), getUser);
module.exports = user_router;