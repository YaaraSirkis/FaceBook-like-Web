const net = require('net');

class TCPClient {
    constructor(serverAddress, serverPort) {
        this.serverAddress = serverAddress; 
        this.serverPort = serverPort; 
    }

    send(clientData) {
        return new Promise((resolve, reject) => {
            const client = net.createConnection(this.serverPort, this.serverAddress, () => {
                console.log('Connected to TCP server');
                client.write(clientData);
            });

            client.on('data', (data) => {
                console.log('Received from server:', data.toString());
                client.end(); // Close the connection after receiving data
               // return data.toString();
               resolve(data.toString());
            });

            client.on('close', () => {
                console.log('Connection closed');
            });

            client.on('error', (err) => {
                console.error('Connection error:', err);
                reject(err);
            });
        });
    }

    

}

module.exports = TCPClient;