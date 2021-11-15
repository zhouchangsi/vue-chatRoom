<template>
  <div class="message-bar">
    <!--selectEmoji()"-->
    <div class="message-tools-bar">
      <el-popover
          class="tool-btn"
          placement="top"
          width="325"
          trigger="click">
        <VEmojiPicker class="emoji-picker" @select="selectEmoji"/>
        <el-button slot="reference" title="表情">
          😂
        </el-button>
      </el-popover>
      <el-button class="tool-btn" icon="el-icon-edit" @click="setName">
      </el-button>
      <el-button class="tool-btn" icon="el-icon-delete" @click="clearMessage">
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
    <!--sendMessage()-->
    <div class="message-button-bar">
      <el-button
          class="btn-send"
          size="medium"
          native-type="submit"
          round
          @click="sendMessage"
      >
        发送
      </el-button>

      <el-button
          class="btn-clear"
          size="medium"
          native-type="submit"
          round
          @click="clearMessage"
      >
        清除
      </el-button>
    </div>
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
  border: 1px solid #ebeef5;
}

.message-tools-bar {
  display: flex;
  align-items: center;
  height: 45px;
}

.tool-btn {
  margin-left: 15px;
}

.message-input {
  height: 90px;
}

.message-button-bar {
  height: 45px;
}

</style>