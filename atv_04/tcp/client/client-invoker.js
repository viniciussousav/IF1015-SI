const Marshaller = require('../common/marshaller');
const Unmarshaller = require('../common/unmarshaller');
const net = require('net');

class ClientInvoker {
    
    constructor(){
        
        this.client =  new net.Socket();
        
        this.client.connect(8081, () => {
            this.client.on('data', data => {
                console.log(Unmarshaller.inputStream(data));
            });
        });
    }

    write(message){
        Marshaller.outputStream(this.client, message);
    }
}

module.exports = ClientInvoker;