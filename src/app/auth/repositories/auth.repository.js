const fs = require('fs/promises');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

const readUsers = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(data);       // returns an object/array of the users stored in the users.json file

    } catch(err) {
        if (err.code === "ENOENT")
            return [];

        throw err;
    }
}

const writeUsers = async (users) => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8'); 
    // writes the updated users array/object to the users.json file
}

exports.findByEmail = async (email) => {
    const users = await readUsers();
    return users.find(user => user.email === email);
}

exports.findByUsername = async (username) => {  
    const users = await readUsers();
    return users.find(user => user.username === username);  
}

exports.create = async (user) => {
    const users = await readUsers();
    const newUser = {
        id: Date.now(), 
        ...user
    };
    users.push(newUser);
    await writeUsers(users);

    return newUser;
}