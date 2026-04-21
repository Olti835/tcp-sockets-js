const net = require("net");
const readline = require("readline");
const { TCP_PORT } = require("./config");

const HOST = "127.0.0.1";
const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(TCP_PORT, HOST, () => {
    console.log("--- U lidhe me sukses me TCP Server ---");

    rl.question("Username: ", (username) => {
        rl.question("Password: ", (password) => {
            client.write(`login ${username} ${password}`);
        });
    });
});

client.on("data", (data) => {
    const message = data.toString();
    console.log("\nPërgjigjja:", message);

    // pasi login të ketë sukses, vazhdo me komanda
    if (message.includes("successful")) {
        console.log("Shkruaj nje komande (psh: list ose delete file.txt):");
        rl.prompt();

        rl.on("line", (line) => {
            client.write(line.trim());
        });
    }
});

client.on("close", () => {
    console.log("Lidhja u mbyll.");
    process.exit();
});