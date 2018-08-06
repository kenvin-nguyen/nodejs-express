var config = require('config');
var db = require('knex')(config.get('db'));

function getUserByUsername(username){
    var data = {};
    return db('nodejs_express.user')
    .select('username', 'password')
    .where('username','=', username)
    .then(rows => {
        return rows[0];
    });

}


module.exports ={
    getUserByUsername: getUserByUsername
}