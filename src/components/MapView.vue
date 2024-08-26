<template>
  <q-page class="flex flex-center">
    <div class="q-mb-md">
      <q-btn @click="resetMap" label="Reset Map" color="primary"/>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import MousePosition from 'ol/control/MousePosition';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls} from 'ol/control';

export default defineComponent({
  name: 'MapView',
  setup() {
    const mapContainer = ref<HTMLDivElement | null>(null);
    const map = ref<Map | null>(null);

    onMounted(() => {
      if (mapContainer.value) {
        map.value = new Map({
          target: mapContainer.value,
          layers: [
            new Tile({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
          }),
          // controls: defaultControls()
        });

        const mousePositionControl = new MousePosition({
          coordinateFormat: (coord) => coord.join(', '),
          projection: 'EPSG:4326',
          target: document.createElement('div'),
          className: 'mouse-position',
        });
        map.value.addControl(mousePositionControl);

        // const zoomControl = new Zoom();
        // map.value.addControl(zoomControl);

        const scaleLineControl = new ScaleLine();
        map.value.addControl(scaleLineControl);

        map.value.on('change:view', () => {
          if (map.value) {
            const view = map.value.getView();
            console.log('View changed:', view.getCenter(), view.getZoom(), view.getRotation());
          }
        });

        onUnmounted(() => {
          if (map.value) {
            map.value.setTarget(undefined);
          }
        });
      }
    });

    const resetMap = () => {
      if (map.value) {
        map.value.getView().setCenter(fromLonLat([0, 0]));
        map.value.getView().setZoom(2);
      }
    };

    return {
      mapContainer,
      resetMap,
    };
  },
});
</script>

<style>

.ol-zoom {
  top: 10px;
  left: 10px;
  position: absolute;
} 
.ol-scale-line{
  position: absolute;
  bottom: 30px;
  /* border-bottom: 1px solid black; */
}
.ol-attribution {
  position: absolute;
  bottom: 0px;
  left: 40%
}
.ol-attribution ul{
  list-style-type: none;
  text-decoration: none;
}
</style>
<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}
.mouse-position {
  background: white;
  padding: 5px;
}
</style>
