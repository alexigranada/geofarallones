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
import Overlay from 'ol/Overlay.js';
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

/**POPUP  */
const element = document.getElementById('popup');
const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
});
map.addOverlay(popup);

let popover;
function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
}

map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
    return feature
  });
  disposePopover();
  let popover = bootstrap.Popover.getInstance(element);
  if (!feature) {
    return;
  }
  console.log(feature);
  popup.setPosition(evt.coordinate);
  popover = new bootstrap.Popover(element, {
    animation: false,
    container: element,
    content: '<p>Nombre:</p><code>' + feature.get('nombre') + '</code>' 
            +'<p>Categoria: </p><code>' + feature.get('categoria') + '</code>',
    
    html: true,
    placement: 'top',
    title: 'Fundación Farallones',
  });
  popover.show();
  console.log('Abrir');
});

/*
const element = popup.getElement();
map.on('click', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
  popup.setPosition(coordinate);
  let popover = bootstrap.Popover.getInstance(element);
  if (popover) {
    popover.dispose();
  }
  popover = new bootstrap.Popover(element, {
    animation: false,
    container: element,
    content: '<p>The location you clicked was:</p><code>' + hdms + '</code>',
    html: true,
    placement: 'top',
    title: 'Welcome to OpenLayers',
  });
  popover.show();
});*/