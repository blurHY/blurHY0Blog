<template>
  <div class="media mt-4">
    <div class="d-flex mr-3" v-html="avatar"></div>
    <div class="media-body">
      <h5 class="mt-0">{{username}}</h5>
      <div v-html="marked(body)"></div>
      <slot name="nested-component"/>
    </div>
  </div>
</template>

<script>
let jdenticon = require("jdenticon");
import marked from "marked";
import hdate from "human-date";

let renderer = new marked.Renderer();

export default {
  props: ["body", "date_added", "userpub", "username"],
  data() {
    return {};
  },
  computed: {
    avatar() {
      return jdenticon.toSvg(this.userpub, 80);
    }
  },
  methods: {
    marked() {
      marked.setOptions({
        renderer: renderer,
        highlight(code) {
          return hljs.highlightAuto(code).value;
        },
        sanitize: true
      });
      return marked.apply(this, arguments);
    }
  }
};
</script>

<style>
</style>
