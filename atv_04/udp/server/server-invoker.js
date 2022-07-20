const Marshaller = require('../common/marshaller');
const Unmarshaller = require('../common/unmarshaller');
const dgram = require('dgram');

class ServerInvoker {
    
    constructor(invocationHandler){
        
        this.socket =  dgram.createSocket('udp4');
        
        this.socket.on('message', (msg, rinfo) => {
            try {
                const input = Unmarshaller.inputStream(msg);
                var result = invocationHandler(input);
                this.send(result, rinfo.port);   
            } catch (error) {
                this.send("Expressão inválida", rinfo.port); 
            }       
        });

        this.socket.bind(8081);
    }

    send(message, port){
        Marshaller.outputStream(this.socket, message, port);
    }
}

module.exports = ServerInvoker;