class Marshaller {
    static outputStream(socket, data, port){
        let bytes = Buffer.from(data.toString());
        socket.send(bytes, port, 'localhost');
    }
}

module.exports = Marshaller;