<!-- fichier central de l'qpplication Vue.-->

<template>
    <div id="app">
      <Navi></Navi>
      <router-view></router-view>
    </div>
</template>

<script>
import Navi from "./components/Navi";

export default {
    name: "App",
    components: {
      Navi
    }
}
</script>

<style>
  body {
    background: rgb(255, 0, 0);
    background: linear-gradient(62deg, #ff5353 0%, #ffc6ec 100%);
  }
</style>
