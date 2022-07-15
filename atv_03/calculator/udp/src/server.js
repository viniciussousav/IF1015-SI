const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const processOperation = (arr) => {
    
    const firstElement = Number.parseInt(arr[0]);
    const operator = arr[1];
    const secondElement = Number.parseInt(arr[2]);
    
    var result = undefined;

    if (operator == '+')
        result =  firstElement + secondElement;
    if (operator == '-')
        result = firstElement - secondElement;
    if (operator == '/')
        result = firstElement / secondElement;
    if (operator == '*')
        result = firstElement * secondElement;
    
    if (!result)
        throw "Invalid operation";
    
    return result;
}

socket.on('message', (msg, rinfo) => {
    try {
        console.log(`INFO: requisição recebida da porta ${rinfo.port}`);
        const elements = msg.toString().split(' ');
        var result = processOperation(elements);
        socket.send(`RESULTADO: ${result}`, rinfo.port, rinfo.address);
        console.log(`INFO: resposta enviada para a porta ${rinfo.port}`);
    } catch (error) {
        socket.send(`ERROR: ${error}`, rinfo.port, rinfo.address);
        console.log(`ERROR: erro ao processar requisição para a porta ${rinfo.port}`);
    }
});

socket.bind(8081);