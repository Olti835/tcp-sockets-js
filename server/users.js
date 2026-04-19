const fs = require("fs");
const path = require("path");
const config = require("./config");

const USERS_FILE = path.join(__dirname, config.USERS_FILE);

function getUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error("Gabim ne lexim te users.json", err);
        return [];
    }
}
function findUser(username) {
    const users = getUsers();
    return users.find(u => u.username === username);
}
function addUser(newUser) {
    const users = getUsers();
    users.push(newUser);

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
function updateUser(username, newData) {
    const users = getUsers();
    const index = users.findIndex(u => u.username === username);

    if (index !== -1) {
        users[index] = { ...users[index], ...newData };
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    }

    return false;
}

module.exports = {
    getUsers,
    findUser,
    addUser,
    updateUser
};