var express = require('express');
var user_router = express.Router();
var userlogic = require('./user_logic');
const logger = require('../helpers/logger');

const test_account = { username: 'kevin', password: '123456'};

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

user_router.post('/login', login);
 module.exports = user_router;