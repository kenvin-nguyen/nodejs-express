var express = require('express');
var user_router = express.Router();
var userlogic = require('./user_logic');

const test_account = { username: 'kevin', password: '123456'};

login = (req, res) => {
    var postdata = req.body;
    userlogic.getUserByUsername(postdata.username).then(data => {
        if(postdata.username == data.username && postdata.password == data.password){
            res.status(200).send('login susscessful!');
        }
        else{
            res.status(500).send('login fail!')
        }
    }); 
}

user_router.post('/login', login);
 module.exports = user_router;