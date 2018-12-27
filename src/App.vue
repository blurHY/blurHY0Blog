<template>
  <div id="app" class="flex-grow-1 d-flex flex-column">
    <nav-bar-component class="shadow-sm"/>
    <b-container class="flex-grow-1">
      <div class="row mt-5 flex-grow-1">
        <div class="col-md-8 left-panel p-0">
          <router-view/>
        </div>
        <div class="col-md-4">
          <horizon-widget-component class="mb-4 border-0"/>
          <about-widget-component class="border-0"/>
        </div>
      </div>
    </b-container>
    <footer-component class="mt-3"/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
body {
  padding-top: 54px;
  overflow-y: scroll;
  background: #f6f6f6;
}
</style>
