const Marshaller = require('../common/marshaller');
const Unmarshaller = require('../common/unmarshaller');
const net = require('net');

class ServerInvoker {

    constructor(invocationHandler){
        
        this.server = new net.createServer(socket => {
            socket.on('data', data => {
                try {
                    var input = Unmarshaller.inputStream(data);
                    const result = invocationHandler(input);
                    this.write(socket, result);
                } catch (error) {
                    this.write(socket, "Expressão inválida"); 
                }  
            });
        });
        
        this.server.listen(8081, 'localhost');
    }

    write(socket, message){
        Marshaller.outputStream(socket, message);
    }
}

module.exports = ServerInvoker;