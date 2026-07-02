const authRepo = require('../repositories/auth.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (email, username, password) => {
    // if (authRepo.findByEmail(email)) {
    //     throw new Error('This email has an existing account!');
    // }

    const existingEmail = await authRepo.findByEmail(email);
    if (existingEmail) {
        throw new Error('This email has an existing account!');
    }

    const existingUsername = await authRepo.findByUsername(username);
    if (existingUsername) {
        throw new Error('Username is taken!');
    } 

    // after checks, hash password & create user object
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        email,
        username,
        password: hashedPassword
    };

    return authRepo.create(user);
}