


let array = [
    ["socket 1", { name: "room1" }],
    ["room 1", {
        usersInRoom: [["socket.id", "username"]],
        msgsInRoom: [
        ]
    }
    ]
]

function Msg(sender = "unknow sender", text = "unknow text") {
    this.sender = sender
    this.text = text
}
function Room(usersInRoom = new Map(), msgsInRoom = [new Msg()]) {
    this.usersInRoom = usersInRoom
    this.msgsInRoom = msgsInRoom
}

let roomList = new Map()

exports.roomList = function () {
    return roomList
}

exports.setRoom = function (socket, roomname) {
    roomList.set(roomname, new Room())
    this.findUsersInRoom(roomname).set(socket.id, socket.username)
    this.findMsgsInRoom(roomname).push(
        new Msg(socket.username, `${socket.id} 加入 ${roomname}`)
    )
}

exports.leaveRoom = function (socket) {
    this.findUsersInRoom(socket.currentRoom).delete(socket.id)
}

exports.pushMsgInRoom = function (roomname, msg = new Msg("? sender", "? text")) {
    this.findMsgsInRoom(roomname).push(msg)
}

exports.setName = function () {

}

exports.findRoom = function (roomname) {
    return roomList.get(roomname)
}

exports.findUsersInRoom = function (roomname) {
    return roomList.get(roomname).usersInRoom
}

exports.findMsgsInRoom = function (roomname) {
    return roomList.get(roomname).msgsInRoom
}

exports.test = function (socket) {
    console.log(socket.id + ">>>>>>>>>>>>>>>>>>>>>");
    this.setRoom(socket, "新房间1")
    socket.currentRoom = "新房间1"
    this.pushMsgInRoom(socket.currentRoom, { sender: socket.username, text: "就这" })
    console.log(this.findMsgsInRoom(socket.currentRoom));
}
exports.test_roomList = [
    {
        name: "room 0",
        usersInRoom: [
            "room 0: id 0",
            "room 0: id 1"
        ],
        msgsInRoom: [
            {
                sender: "room 0: sender 0",
                text: "room 0: text 0",
            },
            {
                sender: "room 0: sender 1",
                text: "room 0: text 1",
            },
        ],
    },
    {
        name: "room 1",
        usersInRoom: [
            "room 1: id 0",
            "room 1: id 1"
        ],
        msgsInRoom: [
            {
                sender: "room 1: sender 0",
                text: "room 1: text 0",
            },
            {
                sender: "room 1: sender 1",
                text: "room 1: text 1",
            }
        ]
    },
    {
        name: "room 2",
        usersInRoom: [
            "room 2: id 0",
            "room 2: id 1"
        ],
        msgsInRoom: [
            {
                sender: "room 2: sender 0",
                text: "room 2: text 0",
            },
            {
                sender: "room 2: sender 1",
                text: "room 2: text 1",
            }
        ]
    }
]