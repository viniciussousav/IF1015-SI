const net = require("net");

const processOperation = (arr) => {
    
    const firstElement = Number.parseInt(arr[0]);
    const operator = arr[1];
    const secondElement = Number.parseInt(arr[2]);

    if (operator == '+')
        return  firstElement + secondElement;
    if (operator == '-')
        return  firstElement - secondElement;
    if (operator == '/')
        return  firstElement / secondElement;
    if (operator == '*')
        return  firstElement * secondElement;

    throw "Invalid operation";
}

const server = net.createServer(socket => {

    socket.on('data', data => {
        try {
            const elements = data.toString().split(' ');
            var result = processOperation(elements);
            socket.write(`RESULTADO: ${result}`);
        } catch (error) {
            socket.write(`ERROR: ${error}`)
        }
    });

    socket.on('error', () => {
        socket.end();
    });
});

server.on('connection', conn => {
    conn.write('Digite uma operação como mostra o exemplo e aperte ENTER para obter o resultado. Ex: 2 + 2.');
});

server.listen(4000, '127.0.0.1');