var app = require('express')();
var bodyParser = require('body-parser');

const api_router = require('./rest_api/api_routing');
const logger = require('./helpers/logger');
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const passport = require('./rest_api/security/passport.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    name: 'app-session',
    secret: 'app-secret-key'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api_router);
app.use('/',(req, res) =>{
    res.status(200).send("Welcome to nodejs  express");
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

