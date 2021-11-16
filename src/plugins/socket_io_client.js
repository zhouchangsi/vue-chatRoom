import {io} from "socket.io-client";
import store from "@/store";

const socket = io("http://localhost:3000")
;(function () {
    socket.on('connect', () => {

        socket.on('client-info', (dataObj) => {
            store.commit('mod_data', (state) => {
                state.socketId = socket.id
                state.currentUser = dataObj.username
                state.currentRoom = dataObj.currentRoom
            })
        })

        socket.on('room-name-list', (dataArr) => {
            store.commit('mod_data', (state) => {
                state.roomNameList = dataArr
            })
        })

        socket.on('current-room-users', (dataArr) => {
            store.commit('mod_data', (state) => {
                state.currentRoomUsers = dataArr;
            })
        })

        socket.on('current-room-megs', (dataArr) => {
            store.commit('mod_data', (state) => {
                state.currentRoomMegs = dataArr;
            })
        })

        socket.on("ping-option", (pingOption) => {
            store.commit('mod_data', (state) => {
            })
        })
    })
})()

export default socket
