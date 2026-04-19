
const net = require('net');
const readline = require('readline');

const HOST = '127.0.0.1'; 
const PORT = 3000; 

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(PORT, HOST, () => {
    console.log('--- U lidhe me sukses me TCP Server ---');
    console.log('Shkruaj nje komande (psh: sum 10 5):');
    rl.prompt();
});

client.on('data', (data) => {
    console.log('\nPërgjigjja: ' + data.toString());
    rl.prompt();
});

rl.on('line', (line) => {
    client.write(line);
});

client.on('close', () => {
    console.log('Lidhja u mbyll.');
    process.exit();
});