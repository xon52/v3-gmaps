<template>
  <span class="gmaps-error">
    <slot></slot>
  </span>
</template>

<style lang="scss">
.gmaps-error {
  position: absolute;
  top: 50%;
  left: 5%;
  width: 90%;
  transform: translateY(-50%);
  color: rgb(175, 0, 0);
  font-size: 24px;
}
</style>
