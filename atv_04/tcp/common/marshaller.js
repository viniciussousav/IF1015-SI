class Marshaller {
    static outputStream(socket, data){
        const bytes = Buffer.from(data.toString());
        socket.write(bytes);
    }
}

module.exports = Marshaller;