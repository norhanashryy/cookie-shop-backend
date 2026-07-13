const bcrypt = require('bcrypt');

exports.hashPassword = async (password) =>{ 
    return bcrypt.hash(password, 10);
}

exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}