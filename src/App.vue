<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">

body {
  overflow-y: scroll;
}

#app {
  font-family: "Roboto", "Avenir", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


/* Mixins */

@mixin container {
  padding-left: calc(50% - 1024px/2);
  padding-right: calc(50% - 1024px/2);
}


/* Header */

.header {
  @include container;

  display: flex;
  justify-content: space-between;
  height: 80px;
  border-bottom: 1px solid #e8e8e8;
}

.nav-wrapper {
  display: flex;
  flex-direction: row;
}

.nav-menu {
  display: flex;
  border-bottom: none;
}

.nav-menu__item {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}


/* Main */

.main-content {
  @include container;
  padding-top: 50px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 28px;
  line-height: 40px;
  text-align: left;
}
</style>
