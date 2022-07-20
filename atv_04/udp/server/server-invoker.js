const Marshaller = require('../common/marshaller');
const Unmashaller = require('../common/unmarshaller');
const dgram = require('dgram');

class ServerInvoker {
    
    constructor(invocationHandler){
        
        this.socket =  dgram.createSocket('udp4');
        
        this.socket.on('message', (msg, rinfo) => {
            try {
                const expression = Unmashaller.inputStream(msg);
                var result = invocationHandler(expression);
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