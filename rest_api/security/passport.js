var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var userlogic = require('../logic_user');
const logger = require('../../helpers/logger');

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    userlogic.findById(id).then(user => {
        done(null, user);
    })
    .catch(err =>{
        done(err, null);
    })
});

passport.use('local-login', new LocalStrategy({ 
    passwordField: 'password',
    passReqToCallback: true,
    session: true
},
    function (req, username, password, done) {
        userlogic.getUserByUsername(username).then(function (result) {
            if(result && result.username === username && bcrypt.compareSync(password, result.password)){
                return done(null, result);
            }
            else{
                return done({err: `username or password is incorrect`}, false);
            }
        });
    }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, username, password, done) {
    
    userlogic.getUserByUsername(username).then(function (user) {
        if (user) {
            return done({err: `Username has been used`}, false);
        } else {
            var newUser = {
                name: username,
                birthday: '2000-01-01',
                username: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            };
            
            // save signup user
            return userlogic.insertUser(newUser);
        }
    })
    .then(userReturn => {
        if(userReturn){
    
            return done(null, userReturn[0]);
        }
    })
    .catch(err =>{
        return done(err, false);
    });
    
}));

module.exports = passport;