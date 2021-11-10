<template>
  <div>
    <nav>
      <router-link v-for="route in routes" :to="route.path" exact>{{ route.name }}</router-link>
      <!-- <router-link to="/shapes" exact>Shapes</router-link> -->
    </nav>
    <div class="page-view">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routes } from './router'
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
nav {
  background-color: #444;
  border-bottom: #999 1px solid;
  text-align: center;
  padding: 0;
  margin: 0;
  a {
    display: inline-block;
    color: #fff;
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
.page-view {
  width: 100%;
  min-height: 500px;
}
.fade-enter-active {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
