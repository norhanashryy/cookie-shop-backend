const authRepo = require('../repositories/auth.repository');
const {hashPassword, comparePassword} = require('../../common/utils/hash');
const {createAccessToken, createRefreshToken } = require('../../common/utils/jwt'); 
const { UserAlreadyExistsError, InvalidCredentialsError } = require('../utils/errors');
const logger = require('../../common/logger/logger');

exports.register = async (email, password, correlationId) => {
    /* if (authRepo.findByEmail(email)) {
        throw new Error('This email has an existing account!');
        }
    */

    // const existingUsername = await authRepo.findByUsername(username);
    // if (existingUsername) {
    //     throw new Error('Username is taken!');
    // } 
    
    logger.info('Registering user with email: ' + email, { correlationId });
    const existingEmail = await authRepo.findByEmail(email);
    if (existingEmail) {
        throw UserAlreadyExistsError;
    }

    logger.info('User doesnt exist', { correlationId });

    const hashedPassword = await hashPassword(password);  // after checks, hash password & create user object
    logger.info('Hashed password', { correlationId }    );

    const user = {
        email,
        password: hashedPassword
    };
    return authRepo.create(user);
    
    logger.info('User created.', { correlationId });
}

exports.login = async (email, password, correlationId) => {
    const user = await authRepo.findByEmail(email);
    if (!user) {
        throw InvalidCredentialsError;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw InvalidCredentialsError;
    }       

    return {
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user)
    };
}