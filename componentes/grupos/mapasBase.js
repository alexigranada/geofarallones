import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import XYZ from 'ol/source/XYZ';
//import LayerGroup from 'ol/layer/Group';
import Graticule from 'ol/layer/Graticule';
import Stroke from 'ol/style/Stroke.js';
import TileWMS from 'ol/source/TileWMS.js';
import {getRenderPixel} from 'ol/render.js';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';


export function MapBase () {
  /**Retina tiles*/
  //https://api.maptiler.com/maps/basic-4326/?key=W5lV2tLMxZAza9GGxomX#2.0/52.99805/-113.51074
  //https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=W5lV2tLMxZAza9GGxomX
  const key = 'W5lV2tLMxZAza9GGxomX#2.0/52.99805/-113.51074';
  const attributionsTiles = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ';

  /**Mapas Base*/
  const osm = new TileLayer({
    title: 'OSM',
    type: 'base',
    visible: false,
    source: new OSM()
  });

  /**Satelital*/
  const satelital = new TileLayer({
    title: 'Satelital',
    type: 'base',
    visible: true,
    source: new XYZ({
      attributions: attributionsTiles,
      url:
        'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=' +
        key,
      tilePixelRatio: 2, // THIS IS IMPORTANT
    })
  });
  
  const watercolor = new TileLayer({
    title: 'Alidade Smooth Dark',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
      layer: 'alidade_smooth_dark',
      retina: true,
    })
  });
  
  const toner = new TileLayer({
    title: 'Watercolor',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
      layer: 'stamen_watercolor'
    })
  });

  const outdoor = new TileLayer({
    title: 'Outdoor',
    type: 'base',
    visible: false,
    source: new XYZ({
      attributions: attributionsTiles,
      url:
        'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}@2x.png?key=' +
        key,
      tilePixelRatio: 2, // THIS IS IMPORTANT
    })
  });
  
  const terrain = new TileLayer({
    title: 'Terrain',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
      layer: 'stamen_terrain_labels'
    })
  });

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

  /**Grupo Mapas Base*/
  const baseMaps = new LayerGroup({
    title: 'Base maps',
    layers: [satelital, wmsLayer] /**terrain, osm, watercolor, toner, outdoor, */
  });

  /** Swipe */
  const swipe = document.getElementById('swipe');
  
  satelital.on('prerender', function (event) {
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
  
  satelital.on('postrender', function (event) {
    const gl = event.context;
    gl.disable(gl.SCISSOR_TEST);
  });
  
  swipe.addEventListener('input', function () {
    map.render();
  });

  return baseMaps;
}

//**GRID */
export function Grid () {
    
  /**Grilla*/
  const grid = new Graticule({
    // the style to use for the lines, optional.
    strokeStyle: new Stroke({
      color: 'rgba(250,250,250,0.1)',
      width: 1.5,
      lineDash: [0.9, 3], //Punteado
    }),
    title: 'Grid',
    //type: 'base',
    visible: true,
    showLabels: true,
    wrapX: false,
  });

  /**Grupo Utilidades*/
  const utility = new LayerGroup({
    title: 'Utilidades',
    layers: [grid]
  });

  return utility;
}

export default {MapBase, Grid};


