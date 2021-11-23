<template>
  <nav>
    <div class="logo">
      <router-link to="/" exact><img src="../assets/v3-gmaps.png" /></router-link>
    </div>
    <div class="links">
      <router-link v-for="route in menuRoutes" :to="route.path" exact>{{ route.name }}</router-link>
    </div>
    <div class="github">
      <a href="https://github.com/xon52/v3-gmaps" target="_blank" exact><img src="../assets/github.png" /></a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { menuRoutes } from '../router'
</script>

<style lang="scss">
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #444;
  border-bottom: #999 1px solid;
  text-align: center;
  padding: 0 20px;
  margin: 0;

  .logo,
  .github {
    margin: 5px;
    height: 35px;
    img {
      height: 100%;
    }
  }
  .links {
    margin: 0 20px;
    a {
      display: inline-block;
      color: #eee;
      font-size: 1.2rem;
      height: 40px;
      line-height: 40px;
      min-width: 100px;
      padding: 0 20px;
      width: auto;
      text-decoration: none;
      transition: 0.3s background-color;
    }
    a:hover {
      background-color: #44a5ff;
    }
    a.router-link-active {
      background-color: #eee;
      color: #44a5ff;
      cursor: default;
    }
  }
}
</style>
