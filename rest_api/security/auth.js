
const UNAUTHORIZED = 401;

function isAuthenticated() {
    return function(req, res, next) {
        if (!req.isAuthenticated()){
            res.status(UNAUTHORIZED).json({
                'err': 'no login'
            });
        }
        else {
            next();
        }
    };
}

module.exports = {
    isAuthenticated
}