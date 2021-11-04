<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <hr>
    <ul>
      <li></li>
    </ul>
    <v-textarea
        outlined
        name="input area"
        label="Input area"
        v-bind:value="msg"
    ></v-textarea>
  </div>
</template>
<script>
import socket from "@/plugins/socket_io_client";

export default {
  data() {
    return {
      msg: "this is a msg"
    }
  },
  methods: {
    socketOn: function () {
      const _this = this
      socket.on('connect', () => {
        console.log([socket.id, this.msg])

        socket.on('msg to client', (msg) => {
          _this.msg = msg
        })
      })
    }
  },
  mounted() {
    this.socketOn()
    socket.emit('emit msg to serer',"hello world!")
  }
}

</script>
