const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Bem vindo! Pressione ENTER para enviar uma nova mensagem para o cliente.');

const handleConnection = socket => {

    socket.on('end', () => {
        console.log('Desconexão realizada.');
    });

    socket.on('error', () => {
        console.log('Houve um erro na conexão');
    });

    socket.on('data', data => {
        const str = data.toString();
        if(str === 'end') socket.end();
        console.log(`CLIENTE: ${str}`);
    });

    rl.addListener('line', line => {
        socket.write(line);
    });
};

const server = net.createServer(handleConnection);
server.listen(4000, '127.0.0.1');