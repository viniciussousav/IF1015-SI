const readline = require('readline');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Digite uma operação como mostra o exemplo e aperte ENTER para obter o resultado. Ex: 2 + 2.');

rl.addListener('line', input => {
    client.send(input, 8081, 'localhost');
});

client.on('message', (msg) => {
    console.log(msg.toString());
});

client.bind();