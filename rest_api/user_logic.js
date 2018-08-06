var config = require('config');
var db = require('knex')(config.get('db'));

function getUserByUsername(username){
    return db.raw(`SELECT username, password FROM nodejs_express.user WHERE username = '${username}'`)
    .then(function (data) {
        return data.rows[0];
    })
    .catch(function (e) { // Catch query err
        console.log('error:', e);
        exit();
    });
}

function exit(){
    db.destroy();
    process.exit();
}

// To handle unhandled Rejection
process.on('unhandledRejection', function(err, promise) {
    console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
    exit();
});


module.exports ={
    getUserByUsername: getUserByUsername
}