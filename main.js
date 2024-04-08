import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import MapBase from './componentes/mapas/mapasBase';

const Mapas = MapBase()

/**Main Map */
const map = new Map({
  target: 'map',
  layers: [
    Mapas,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
    rotation: 0.5,
  })
});

/**FUNCIONES DEL MAPA*/
/***Layer Swicher*/
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);