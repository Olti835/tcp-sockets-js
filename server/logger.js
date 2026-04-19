const fs = require("fs");
const path = require("path");
const config = require("./config");

const LOGS_FILE = path.join(__dirname, config.LOGS_FILE);
const MESSAGES_FILE = path.join(__dirname, config.MESSAGES_FILE);
function readFile(file) {
    try {
        if (!fs.existsSync(file)) return [];
        return JSON.parse(fs.readFileSync(file));
    } catch (err) {
        console.error("Gabim ne lexim file:", err);
        return [];
    }
}

function writeFile(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Gabim ne shkrim file:", err);
    }
}

function logEvent(event, username, ip, description) {
    const logs = readFile(LOGS_FILE);

    logs.push({
        timestamp: new Date().toISOString(),
        event,
        username,
        ip,
        description
    });

    writeFile(LOGS_FILE, logs);
}

function logMessage(username, ip, message, type = "TEXT") {
    const messages = readFile(MESSAGES_FILE);

    messages.push({
        timestamp: new Date().toISOString(),
        username,
        ip,
        message,
        type
    });

    writeFile(MESSAGES_FILE, messages);
}

module.exports = {
    logEvent,
    logMessage
};
