import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import TileWMS from 'ol/source/TileWMS.js';
import {getRenderPixel} from 'ol/render.js';

/**Imagen histórica */
const wmsSource = new TileWMS({
  url: 'http://uvmanos.gisfer.net:8080/geoserver/farallones/wms',
  params: {"LAYERS" : "farallones:1982", 'TILED': true},
  serverType: 'geoserver',
  crossOrigin: 'anonymous',
});

const wmsLayer = new TileLayer({
  title: 'Histórica',
  visible: true,
  source: wmsSource,
}); 

const key = 'W5lV2tLMxZAza9GGxomX#';

const imagery = new TileLayer({
  source: new XYZ({
    url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
    tileSize: 512,
    attributions:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 20,
  }),
});

const map = new Map({
  layers: [imagery, wmsLayer],
  target: 'map',
  view: new View({
    center: [-8535000, 371500],
    zoom: 13.5,
  }),
});

const swipe = document.getElementById('swipe');

wmsLayer.on('prerender', function (event) {
  const gl = event.context;
  gl.enable(gl.SCISSOR_TEST);

  const mapSize = map.getSize(); // [width, height] in CSS pixels

  // get render coordinates and dimensions given CSS coordinates
  const bottomLeft = getRenderPixel(event, [0, mapSize[1]]);
  const topRight = getRenderPixel(event, [mapSize[0], 0]);

  const width = Math.round((topRight[0] - bottomLeft[0]) * (swipe.value / 100));
  const height = topRight[1] - bottomLeft[1];

  gl.scissor(bottomLeft[0], bottomLeft[1], width, height);
});

wmsLayer.on('postrender', function (event) {
  const gl = event.context;
  gl.disable(gl.SCISSOR_TEST);
});

swipe.addEventListener('input', function () {
  map.render();
});