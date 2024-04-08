import './style.css';
import { Map, View } from 'ol';

import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import ZoomSlider from 'ol/control/ZoomSlider';
import { defaults as defaultControls } from 'ol/control';
//import { OverviewMap, ScaleLine } from 'ol/control';

import LC from './componentes/grupos/mapasBase';
import { MiniMapa, MouseControlPosition, ScaleControl } from './componentes/grupos/utilidades';
import { PlotFarallones } from './componentes/grupos/geojson';
//import { MapBase, Grid } from './componentes/grupos/mapasBase';
//import * as utility from './componentes/grupos/utilidades';

/**Main Map */
const map = new Map({
  controls: defaultControls().extend([MouseControlPosition(), MiniMapa(), ScaleControl()]), //MiniMapa, ScaleControl, 
  target: 'map',
  layers: [ LC.MapBase(), LC.Grid(), PlotFarallones() ],
  view: new View({
    center: [-8400000, 500000],
    zoom: 6,
    //minZoom: 9,
    //maxZoom: 13,
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

/**Zoom*/
map.addControl(new ZoomSlider());