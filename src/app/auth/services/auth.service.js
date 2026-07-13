const authRepo = require('../repositories/auth.repository');
const {hashPassword, comparePassword} = require('../../common/utils/hash');
const {createAccessToken, createRefreshToken } = require('../../common/utils/jwt'); 

exports.register = async (email, password) => {
    /* if (authRepo.findByEmail(email)) {
        throw new Error('This email has an existing account!');
        }
    */

    const existingEmail = await authRepo.findByEmail(email);
    if (existingEmail) {
        throw new Error('This email has an existing account!');
    }

    // const existingUsername = await authRepo.findByUsername(username);
    // if (existingUsername) {
    //     throw new Error('Username is taken!');
    // } 
    
    const hashedPassword = await hashPassword(password);  // after checks, hash password & create user object
    const user = {
        email,
        password: hashedPassword
    };

    return authRepo.create(user);
}

exports.login = async (email, password) => {
    const user = await authRepo.findByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }       

    return {
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user)
    };
}