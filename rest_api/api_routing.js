var express = require('express');
var api_router = express.Router();

const user_router = require('./user.api');

api_router.use('/user', user_router);

module.exports = api_router;