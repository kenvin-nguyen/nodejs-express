var jwt = require('jsonwebtoken');
var configJWT = require('config').jwt;

createToken = (metadata) => {
	return jwt.sign(metadata , configJWT.jwtSecret, { expiresIn: configJWT.expiresIn });
}

decodeToken = (token) => {
	try {
		return decode = jwt.verify(token, configJWT.jwtSecret);
	} catch (err) {
		return null;
	}
}

createLoginTokenRes = (User, IsSignup) => {
    
    let result = {};
    if (IsSignup != null)
        result.IsSignup = IsSignup;
    
    result.id = User.id;
    result.Token = createToken({iss: result.id, UserId: result.id});
    return result;
};

module.exports = {
    createToken,
    decodeToken,
    createLoginTokenRes
}