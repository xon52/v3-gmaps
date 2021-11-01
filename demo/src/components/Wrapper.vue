<template>
  <div id="wrapper">
    <div class="map">
      <slot name="map"></slot>
      <div class="log" title="Event Log">
        <ul>
          <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
        </ul>
      </div>
    </div>
    <div class="controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logs } from './store'
</script>

<style lang="scss">
#wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;

  .map {
    height: 500px;
    width: 100%;
    flex-grow: 1;
    position: relative;
  }
  .controls {
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    margin-top: 20px;

    &:first-child::before {
      margin: 0;
    }
    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: #ccc solid 1px;
      padding: 5px;
      padding-top: 15px;
      margin: 0 15px;
      min-width: 75px;
      label {
        position: absolute;
        top: -8px;
        left: 5px;
        background: white;
        font-size: 0.9rem;
        color: #999;
        padding: 0 5px;
        &::after {
          content: ':';
        }
      }
    }
  }
  .log {
    position: absolute;
    right: 10px;
    bottom: 10px;
    opacity: 0.7;
    overflow: scroll;
    height: 100px;
    width: 30%;
    min-width: 200px;
    background-color: white;
    border: 2px ridge #ccc;
    transition: 0.3s opacity;
    &:hover {
      opacity: 1;
    }
    ul {
      margin: 5px;
      padding: 0;
      list-style-type: none;
      font-size: 0.9rem;
      li {
        margin: 0;
        white-space: nowrap;
        &::before {
          content: '-';
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
