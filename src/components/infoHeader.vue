<template>
  <div class="info-header">
    <i class="el-icon-connection">{{ "\t" + id }}</i>
    <i class="el-icon-user">{{ "\t" + username }}</i>
    <i class="el-icon-house">{{ "\t" + currentRoom }}</i>
  </div>
</template>

<script>

export default {
  name: "infoHeader",
  data() {
    return {}
  },
  computed: {
    id: function () {
      return this.$store.state.socketId
    },
    username: function () {
      return this.$store.state.currentUser
    },
    currentRoom: function () {
      return this.$store.state.currentRoom
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style>
.info-header {
  display: flex;
  justify-content: flex-end;
  border: 1px solid #eeeeee;
  /*box-shadow: 11px 5px #dddddd;*/
  /*box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);*/
}

.info-header i {
  margin: 15px;
}
</style>