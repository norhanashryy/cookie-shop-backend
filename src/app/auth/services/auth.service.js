const authRepo = require('../repositories/auth.repository');
const {hashPassword, comparePassword} = require('../../common/utils/hash');
const {createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../../common/utils/jwt'); 
const { UserAlreadyExistsError, InvalidCredentialsError, UnauthorizedError } = require('../utils/errors');
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

    const hashedPassword = await hashPassword(password);  
    // after checks, hash password & create user object
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

exports.getMe = async (token) => {
    const verifiedUserPayload = verifyAccessToken(token); // throws error if token is invalid or expired
    if (verifiedUserPayload) {
        // use the payload to search for the latest user in the repo
        //console.log(`user's payload: ${JSON.stringify(verifiedUserPayload)}`);
        // return user = await authRepo.findByEmail(verifiedUserPayload.email);    INCORRECT, it creates a global variable

        const user = await authRepo.findByEmail(verifiedUserPayload.email);
        return {
            id: user.id,
            email: user.email        
        };
    }
}

exports.refresh = async (token) => {
    const verifiedRefreshToken = verifyRefreshToken(token);

    const user = await authRepo.findByEmail(verifiedRefreshToken.email);
    if(!user) {
        throw UnauthorizedError;
    }
    return createAccessToken(user);
}