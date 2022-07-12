const net = require("net");

const clients = [];

var broadcast = (originIndex, message) =>
    clients.forEach((client, index) => {
        if(index !== originIndex)
            client.socket.write(message);
    });

const handleConnection = socket => {
    
    socket.on('data', data => {
        
        const socketIndex = clients.findIndex(c => c.socket === socket);
        const username = clients[socketIndex].name;

        if(username === '') {
           
            const newUsername = data.toString();
            clients[socketIndex].name = newUsername;

            socket.write(`Olá, ${newUsername}! Pressione ENTER para enviar uma mensagem`);
            broadcast(socketIndex, `${newUsername} entrou no chat!`);
            
            return;
        }
        
        broadcast(socketIndex, `${username}: ${data.toString()}`);
    });

    socket.on('error', () => {
        const socketIndex = clients.findIndex(c => c.socket === socket);
        const username = clients[socketIndex].name;
        broadcast(socketIndex, `${username} saiu do chat!`);
    });

}

const server = net.createServer(handleConnection);

server.on('connection', conn => {
    if(clients.findIndex(c => c.socket === conn) === -1) {
        clients.push({name: '', socket: conn});
        conn.write('Digite um nome para entrar no chat.');
    }
});

server.listen(4000, '127.0.0.1');