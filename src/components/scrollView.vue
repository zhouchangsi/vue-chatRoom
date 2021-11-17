<template>
  <el-container>
    <!--messages-->
    <el-footer class="message-display" height="600px">
      <div v-for="megObj in messages" class="message-node">
        <h4 class="username">
          <i class="el-icon-user-solid">{{ megObj.sender }}</i>
        </h4>
        <div class="message-card">
          <h4>{{ megObj.text }}</h4>
        </div>
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
  methods: {},
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
  background-color: #eeeef5;
  display: flex;
  flex-direction: column;
}

.message-node {
  margin-bottom: 15px;
  max-width: 300px;
}

.username{
  opacity: 0.5;
}
.message-card {
  padding: 1px 25px 1px 25px;
  background-color: #01b7c4;
  color: #fff;
  border-radius: 0 60px 60px 60px;
}


</style>