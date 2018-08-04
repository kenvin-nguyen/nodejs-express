var express = require('express');
var user_router = express.Router();

const test_account = { username: 'kevin', password: '123456'};

login = (req, res) => {
    var data = req.body;
    if(data.username == test_account.username && data.password == test_account.password){
        res.status(200).send('login susscessful!');
    }
    else{
        res.status(500).send('login fail!')
    }
}

user_router.post('/login', login);
 module.exports = user_router;