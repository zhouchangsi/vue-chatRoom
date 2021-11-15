<template>
  <el-container>
    <!--messages-->
    <el-footer class="message-display" height="600px">
      <div v-for="megObj in messages" class="message-node">
        <el-card class="message-card">
          <div slot="header">
            <i class="el-icon-user-solid"></i>
            <span>: {{ megObj.sender }}</span>
          </div>
          <span>{{ megObj.text }}</span>
        </el-card>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Note from "@/components/note";

export default {
  name: "scrollView",
  components: {Note},
  data() {
    return {}
  },
  computed: {
    state: function () {
      return this.$store.state
    },
    messages: function () {
      return this.state.currentRoomMegs
    }
  },
  methods: {

  },
  created() {
  },
  mounted() {
  }
}

</script>

<style>
@import "../assets/css/scroll_bar.css";

.message-display {
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  background-color: rgba(233, 233, 233, 0.5);

  display: flex;
  flex-direction: column;
}

.message-card {
  max-width: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #01b7c4;
  color: #fff;
}

.message-node {
  margin-bottom: 15px;
}


</style>