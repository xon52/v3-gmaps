<template>
  <div>
    <nav>
      <router-link to="/markers" exact>Multiple Markers</router-link>
      <router-link to="/shapes" exact>Shapes</router-link>
    </nav>
    <div class="page-view">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
nav {
  background-color: #444;
  border-bottom: #999 1px solid;
  text-align: center;
  padding: 0 20px;
  margin: 0;
  a {
    display: inline-block;
    color: #fff;
    font-size: 20px;
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
/* .fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
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
