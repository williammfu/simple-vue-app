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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background: #fafafa;
  border: 1px solid #000000;
  border-radius: 2px;
  cursor: pointer;
  padding: 0.5rem 0.75rem; 
  transition: background 0.1s linear;
}

button:hover {
  background: aliceblue;
}
</style>
