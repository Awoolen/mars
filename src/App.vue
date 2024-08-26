<template>
  <div id="app">
    <MapView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapView from './components/MapView.vue';

export default defineComponent({
  name: 'App',
  components: {
    MapView,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
