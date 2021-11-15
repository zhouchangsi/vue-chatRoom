<template>
  <div class="home">
    <info-header id="info-header"></info-header>
    <div class="message-main">
      <side-bar class="side-bar"></side-bar>
      <div class="message-inter">
        <scroll-view ref="sc"></scroll-view>
        <message-bar></message-bar>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "@/components/sideBar"
import scrollView from "@/components/scrollView";
import messageBar from "@/components/messageBar"
import infoHeader from "@/components/infoHeader";
import socket from "@/plugins/socket_io_client";

export default {
  components: {
    scrollView,
    messageBar,
    infoHeader,
    sideBar
  },
}

</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#info-header {
}

.message-main {
  display: flex;
  width: 100%;
}

.side-bar {
  width: 25%;
  border: 1px solid #ebeef5;
}

.message-inter {
  width: 75%;
}
</style>
