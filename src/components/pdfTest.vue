<template>
  <div id="app" ref="document">
    <div id="element-to-convert">
      <center>
        <img width="400" src="~assets/vasc_poster.jpeg" />
      </center>
    </div>
  </div>
  <button @click="exportToPDF">Export to PDF</button>
</template>

<style>
#app {
  margin-top: 60px;
}
</style>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "app",
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"));
    },
  },
};
</script>
