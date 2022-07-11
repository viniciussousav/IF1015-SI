const net = require('net');
const readline = require('readline');

const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Bem vindo! Pressione ENTER para enviar uma nova mensagem para o servidor.');

client.connect(4000, '127.0.0.1', () => {

    client.on('close', () => {
        console.log('A conexão foi encerrada.');
    });

    client.on('error', () => {
        console.log('A conexão foi perdida.');
    });

    rl.addListener('line', line => {
        client.write(line);
    });

    client.on('data', data => {
        const str = data.toString();
        console.log(`SERVIDOR: ${str}`);
    });
});