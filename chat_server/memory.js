let array = [
    ["默认房间", new Room()],
    ["room 1", new Room()],
    ["room 2", new Room()],
    ["room 3", new Room()],
    ["room 4", new Room()],
    ["room 5", new Room()],
    ["room 6", new Room()],
]

let roomMap = new Map(array)

function Meg(sender, text) {
    this.sender = sender ? sender : "系统 "
    this.text = text ? text : "欢迎"
}

function Room(userMap, megList) {
    this.userMap = userMap ? userMap : new Map()
    this.megArr = megList ? megList : [new Meg()]
}


exports.getRoomMap = function () {
    return roomMap
}
exports.getRoomObj = function (roomname) {
    return roomMap.get(roomname)
}

exports.getUserMapInRoom = function (roomName) {
    if (this.getRoomObj(roomName)) {
        return this.getRoomObj(roomName).userMap
    } else {
        console.log("error _____ No userMap");
    }
}

exports.getMegArrInRoom = function (roomName) {
    if (this.getRoomObj(roomName)) {
        return this.getRoomObj(roomName).megArr
    } else {
        console.log("error ^^^^^^ memory.getMegArrInRoom");
    }
}

exports.pushMegInRoom = function (roomName, sender, text) {
    let meg = new Meg(sender, text)
    this.getMegArrInRoom(roomName).push(meg)
}

exports.joinRoom = function (socket, roomName) {
    if (roomMap.has(roomName)) {
        this.getUserMapInRoom(roomName).set(socket.id, socket.username)
    } else {
        let room = new Room(
            new Map([[socket.id, socket.username]]),
            [new Meg(socket.username, `${socket.username}创建房间${roomName}`)]
        )
        roomMap.set(roomName, room)
    }
}

exports.leaveRoom = function (roomName, id) {
    if (this.getRoomObj(roomName)) {
        this.getUserMapInRoom(roomName).delete(id)
    } else {
        console.log("error ^^^^^ memory.leaveRoom");
    }
}

exports.addUser = function (roomName, id, name) {
    if (roomMap.has(roomName)) {
        this.getUserMapInRoom(roomName).set(id, name)
    } else {
        console.log("error ^^^^^^ memory.addUser");
    }
}

exports.getMapKeyToArray = function (map) {
    let array = []
    for ([key, value] of map) {
        array.push(key)
    }
    return array
}

exports.getMapValueToArray = function (map) {
    let array = []
    for ([key, value] of map) {
        array.push(value)
    }
    return array
}


