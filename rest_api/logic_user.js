var config = require('config');
var db = require('knex')(config.get('db'));

function getUserByUsername(username){
    return db('nodejs_express.user')
    .select('id','username', 'password')
    .where('username','=', username)
    .then(rows => {
        return rows[0];
    });
}

function findById(id){
    return db('nodejs_express.user')
    .select()
    .where('id','=', id)
    .then(rows => {
        return rows[0];
    });
}

async function insertUser(user){
    return await db('nodejs_express.user').insert(user).returning('*');
};


module.exports ={
    getUserByUsername,
    insertUser,
    findById
}