<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  font-family: Segoe UI, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem 0;
}

button {
  background: paleturquoise;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem 0.75rem; 
  transition: all 0.1s linear;
}

button:hover {
  background: darkturquoise;
  color: #fafafa;
}
</style>
