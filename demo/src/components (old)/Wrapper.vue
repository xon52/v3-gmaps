<template>
  <div id="wrapper">
    <div class="map">
      <slot name="map"></slot>
      <div class="log" title="Event Log">
        <ul>
          <li v-for="(l, i) in logs" :key="i">{{ logs.length - i }}. {{ l }}</li>
        </ul>
      </div>
    </div>
    <div class="controls">
      <slot name="controls"></slot>
    </div>
    <div class="description">
      <slot name="description">No description.</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logs } from '../store'
</script>

<style lang="scss">
#wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  .map {
    height: 500px;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    color: black;
  }
  .description {
    min-width: 50%;
    max-width: 600px;
    margin: 10px auto;
    padding: 15px 15px 0 15px;
    background-color: #ccc;
    border: 2px inset #777;
    border-radius: 20px;
    color: #555;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif;
    font-size: medium;
    p:first-of-type {
      margin-top: 0;
    }
  }
  .controls {
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
    &:first-child::before {
      margin: 0;
    }
    > div {
      color: #bbb;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: #999 solid 1px;
      padding: 18px 5px 12px 5px;
      margin: 15px;
      min-width: 150px;
      .control-label {
        position: absolute;
        top: -8px;
        left: 5px;
        background: #333;
        font-size: 0.9rem;
        color: #ccc;
        padding: 0 5px;
        &::after {
          content: ':';
        }
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      button {
        display: block;
        margin: 5px 0;
      }
    }
  }
  .log {
    position: absolute;
    left: 10px;
    bottom: 10px;
    opacity: 0.7;
    overflow: scroll;
    height: 100px;
    width: 400px;
    min-width: 200px;
    max-width: 30%;
    color: #777;
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
      }
    }
  }
}
</style>
