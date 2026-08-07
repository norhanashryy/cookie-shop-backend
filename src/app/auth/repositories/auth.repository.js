const prisma = require('../../common/db/prisma');

exports.findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    });
}

exports.create = async (user) => {
    return prisma.user.create({
        data: user,
    });
}