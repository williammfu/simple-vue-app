<template>
  <div id="app">
    <MainTable/>
  </div>
</template>

<script>
import MainTable from './components/MainTable.vue'

export default {
  name: 'App',
  components: {
    MainTable
  }
}
</script>

<style>
#app {
  font-family: Segoe UI, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
