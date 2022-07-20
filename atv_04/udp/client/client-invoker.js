const Marshaller = require('../common/marshaller');
const Unmarshaller = require('../common/unmarshaller');
const dgram = require('dgram');

class ClientInvoker {
    
    constructor(){
        
        this.socket =  dgram.createSocket('udp4');
        
        this.socket.on('message', (msg, rinfo) => {
            console.log(Unmarshaller.inputStream(msg));
        });

        this.socket.bind();
    }

    send(message){
        Marshaller.outputStream(this.socket, message, 8081);
    }
}

module.exports = ClientInvoker;