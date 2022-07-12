const net = require('net');
const readline = require('readline');

const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(4000, '127.0.0.1', () => {

    client.on('close', () => {
        console.log('A conexão foi encerrada.');
        client.end();
    });

    client.on('error', () => {
        console.log('A conexão com o chat foi perdida.');
        client.end();
    });

    rl.addListener('line', line => {
        client.write(line);
    });

    client.on('data', data => {
        console.log(data.toString());
    });
});