<template>
  <q-item clickable :to="link">
    <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->
    <q-img :src="'src/assets/' + icon" :alt="icon" style="margin-right: 1rem;width: 2.5rem;height: 2.5rem;"/>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    getImgUrl: function (imagePath) {
      return "assets/" + imagePath;
    }
  }
});
</script>
