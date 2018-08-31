var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var userlogic = require('../user_logic');
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


// passport.use('local-login',new LocalStrategy({ 
//     passwordField: 'password',
//     passReqToCallback: true,
//     session: true
// },
//     async function (req, username, password, done) {
//         try {
//             //var postdata = req.body;
//             const user = await userlogic.getUserByUsername(username);
//             if(username == user.username && password == user.password){
//                 res.status(200).send('login susscessful!');
//             }
//             else{
//                 res.status(500).send('login fail!')
//             }
//         } catch (error) {
//             logger.log({level: 'error', message: error });
//             res.status(500).send('Server internal error!');
//         }
//     }
// ));

passport.use('local-login', new LocalStrategy({ 
    passwordField: 'password',
    passReqToCallback: true,
    session: true
},
    function (req, username, password, done) {
        userlogic.getUserByUsername(username).then(function (result) {
            // if (!_.isEmpty(result.err_data)) {
            //     return done(null, false);
            // }
            if(result.username === username && bcrypt.compareSync(password, result.password)){
                return done(null, result);
            }
            else{
                return done({err: `username or password is incorrect`}, false);
            }
            
            // var data = result.data[0];
            // if (_.isEmpty(data)) {
            //     return done(null, false);
            // }else{
            //     var user = {
            //         person_id: data.person,
            //         mode: 'local'
            //     };
            //     return done(null, user);
            // }
           
        });
    }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, username, password, done) {
    // asynchronous
    // Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
    // User.findOne sẽ không được gọi cho tới khi dữ liệu được gửi lại
    //process.nextTick(function () {
        // Tìm một user theo email
        // chúng ta kiểm tra xem user đã tồn tại hay không
        userlogic.getUserByUsername(username).then(function (user) {
            console.log(user);
            if (user) {
                //return done(new Error('Username has been used'));
                return done({err: `Username has been used`}, false);
            } else {
                // Nếu chưa user nào sử dụng email này
                // tạo mới user
                var newUser = {
                    //id: 6,
                    name: username,
                    birthday: '2000-01-01',
                    username: username,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                };
                
                // lưu user
                return userlogic.insertUser(newUser);
                // console.log(userReturn);
                // return done(null, userReturn);
                ///////////////
                
               
            }
        })
        .then(userReturn => {
            if(userReturn){
                console.log(userReturn);
                return done(null, userReturn[0]);
            }
        })
        .catch(err =>{
            console.log('>>>>>>>>>>>>>>>>>>>>>');
            console.log(err);
            return done(err, false);
        });
    //});
}));

module.exports = passport;