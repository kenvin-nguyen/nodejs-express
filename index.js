var app = require('express')();
var bodyParser = require('body-parser');

const api_router = require('./rest_api/api_routing');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', api_router);
app.use('/',(req, res) =>{
    res.status(200).send("Welcome to nodejs  express");
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

