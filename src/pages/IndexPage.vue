<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/banner.jpg" class="poster" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
// import { io } from "socket.io-client";
import { ref } from "vue";

export default {
  setup() {
    const name = "IndexPage";
  },
};
</script>

<style scoped>
.poster {
  padding: 25px;
}
</style>
