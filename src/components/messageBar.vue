<template>
  <div class="message-bar">
    <!--selectEmoji()"-->
    <div class="message-tools-bar">
      <el-popover
          placement="top"
          width="325"
          trigger="click">
        <VEmojiPicker @select="selectEmoji"/>
        <el-button class="tool-btn"
                   slot="reference"
                   icon="el-icon-star-off"
                   type="warning"
                   circle>
        </el-button>
      </el-popover>
      <el-button class="tool-btn" @click="setName"
                 icon="el-icon-edit"
                 type="info"
                 circle>
      </el-button>
      <el-button class="tool-btn" @click="clearMessage"
                 icon="el-icon-delete"
                 type="danger"
                 circle>
      </el-button>
      <el-button
          class="tool-btn"
          size="medium"
          native-type="submit"
          type="success"
          @click="sendMessage"
      >
        发送
      </el-button>
    </div>
    <!--v-model="text_input"-->
    <el-input class="message-input"
              v-model="text_input"
              type="textarea"
              maxlength="99"
              placeholder="请输入内容"
              show-word-limit
              :rows="3">
    </el-input>
  </div>
</template>

<script>
import socket from "@/plugins/socket_io_client";
import note from "@/components/note";

export default {
  name: "messageBar",
  components: {
    note
  },
  data() {
    return {
      text_input: "hello Socket",
      showEmoji: false
    }
  },
  computed: {
    myName: function () {
      return this.$store.state.currentUser
    },
    msgObj: function () {
      return {sender: this.myName, text: this.text_input}
    },
  },
  methods: {
    selectEmoji: function (emoji) {
      this.text_input += emoji.data
    },
    // send message
    sendMessage() {
      if (this.text_input !== "") {
        socket.emit('send-message-in-current-room', this.msgObj)
        this.text_input = ""
      }
    },
    clearMessage: function () {
      this.text_input = ""
    },
    addMessageList: function (msg) {
      this.$store.commit('mod_data', (state) => {
        state.currentRoomMegs.push(msg)
      })
    },
    setName: function (name) {
      this.$prompt("请输入昵称", "更改昵称")
          .then(({value}) => {
            socket.emit("setName", value)
          })
    },
  },
  created() {
    socket.on('message', (msg) => {
      this.addMessageList(msg)
    })
  }
}

</script>

<style>

.message-bar {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 2px #dddddd;
}

.message-tools-bar {
  display: flex;
  align-items: center;
}

.tool-btn {
  margin: 10px 15px;
}

.message-input {
  max-width: 90%;
  margin: 10px 15px;
}


</style>