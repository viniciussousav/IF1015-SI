const readline = require('readline');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.addListener('line', input => {
    client.send(input, 8081,'localhost');  
});

client.on('message', (msg, rinfo) => {
    console.log(`SERVIDOR: ${msg.toString()}`);
});

client.bind(8082);