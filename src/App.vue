<template>
  <div class="app">
    <header>
      <RouterView name="header"></RouterView>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
    <footer>
      <RouterView name="footer"></RouterView>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less' scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    background-color: #fff;
    overflow: auto;
  }
}
</style>
