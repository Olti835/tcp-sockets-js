// 

const net = require("net");
const readline = require("readline");
const { TCP_PORT } = require("../server/config");

const HOST = "127.0.0.1";
const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let loginStep = 0;
let username = "";
let loggedIn = false;

client.connect(TCP_PORT, HOST, () => {
    console.log("--- U lidhe me sukses me TCP Server ---");
    askCredentials();
});

function askCredentials() {
    loginStep = 0;
    console.log("Username:");
}

rl.on("line", (line) => {
    const input = line.trim();

    if (!loggedIn) {
        if (loginStep === 0) {
            username = input;
            loginStep = 1;
            console.log("Password:");
            return;
        }

        if (loginStep === 1) {
            const password = input;
            client.write(`login ${username} ${password}`);
            return;
        }
    } else {
        client.write(input);
    }
});

client.on("data", (data) => {
    const message = data.toString().trim();
    console.log("\nPërgjigjja:", message);

    if (message.includes("Login successful")) {
        loggedIn = true;
        console.log("Shkruaj nje komande (psh: list ose delete file.txt):");
        rl.prompt();
    } else if (!loggedIn) {
        askCredentials();
    } else {
        rl.prompt();
    }
});

client.on("close", () => {
    console.log("Lidhja u mbyll.");
    process.exit();
});

client.on("error", (err) => {
    console.log("Gabim:", err.message);
});