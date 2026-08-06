const prisma = require('../../common/db/prisma');

exports.findByEmail = async (email) => {
    // const users = await readUsers();
    // return users.find(user => user.email === email);

    return prisma.user.findUnique({
        where: {
            email: email
        }
    });
}

exports.create = async (user) => {
    // const users = await readUsers();
    // const newUser = {
    //     id: Date.now(), 
    //     ...user
    // };
    // users.push(newUser);

    return prisma.user.create({
        data: user,
    });
}