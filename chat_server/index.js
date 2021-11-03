const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
})

function logSocketInfo(socket) {
    console.log('connected from client')
    console.log([socket.id,socket.rooms])
}
var sockets = []
io.on('connection', socket => {
    socket.on('msg', (msg) => {
        socket.emit('socketConnectResult')
        logSocketInfo(socket)
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
})
