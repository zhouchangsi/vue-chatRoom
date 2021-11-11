const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const { instrument } = require('@socket.io/admin-ui');
const path = require('path');

const memory = require('./memory')

// debug log
let logTime = 0;
function con(msg) {
    logTime++
    console.log(0, logTime, "\n", msg);
}


// socket create
const io = new Server(server, {
    // 跨域请求
    cors: {
        origin: "*",
        // methods: ['GET', "POST"]
    }
})


const roomList = memory.test_roomList


let user_summary = 0
io.on('connection', socket => {

    initSocket(socket)

    // setting
    socket.on('setName', (name) => {
        setName(socket, name)
    })
    socket.on('joinRoom', (room) => {
        joinRoom(socket, room)
        io.emit('room-list', roomList)
    })

    // send message
    socket.on('send to me', (msg) => {
        socket.emit('message', msg)
    })
    socket.on('send to all', (msg) => {
        io.emit('message', msg)
    })
    socket.on('send to other', (msg) => {
        socket.broadcast.emit("message", msg)
    })

    // disconnect
    socket.on('disconnect', () => {
        user_summary--
        leaveRoom(socket)
    })

})


function initSocket(socket) {
    user_summary++
    socket.currentRoom = "默认房间"
    socket.username = `[${socket.id}]`;
    joinRoom(socket, socket.currentRoom)


    syncData(socket)

}

function joinRoom(socket, roomname) {
    socket.leave(socket.currentRoom)
    socket.join(roomname)
    socket.currentRoom = roomname

    memory.setRoom(socket, roomname)
}

function setName(socket, name) {
}

function leaveRoom(socket) {
    socket.leave(socket.currentRoom)
    memory.leaveRoom(socket)
}

function syncData(socket) {
    let clientInfo = {
        username: socket.username,
        currentRoom: socket.currentRoom
    }
    socket.emit('client-info', clientInfo)
    socket.emit('room-list', memory.roomList())
}

// socket.io/admin-ui
// https://admin.socket.io
instrument(io, { auth: false })
// server.listen(3000)
app.use(express.static(path.join(__dirname, 'public')))
io.listen(3000)
console.log("\n\n\n\n\n\n\n Run server on: http://localhost:3000")



