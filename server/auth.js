const users = require("../users");

function login(username, password) {
    if (!username || !password) {
        return { success: false, message: "Kredenciale te paplota" };
    }

    const user = users.findUser(username);

    if (!user) {
        return { success: false, message: "User nuk ekziston!" };
    }

    if (user.password !== password) {
        return { success: false, message: "Password gabim!" };
    }

    return {
        success: true,
        user: user
    };
}
function isAdmin(user) {
    return user && user.role === "admin";
}
function canWrite(user) {
    return user.role === "admin";
}

module.exports = {
    login,
    isAdmin,
    canWrite
};
