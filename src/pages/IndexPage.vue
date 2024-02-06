<template>
  <q-page class="">
    <div class="text-center">
      <img alt="Quasar logo" src="~assets/banner.jpg" class="poster" />
    </div>
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
  width: 100rem;
  max-width: 100%;
}
</style>
