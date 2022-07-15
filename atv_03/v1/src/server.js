const readline = require('readline');
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.addListener('line', (input) => {
    socket.send(input, 8082,'localhost');
});

socket.on('message', (msg, rinfo) => {
    console.log(`CLIENTE: ${msg.toString()}`)
});

socket.bind(8081);