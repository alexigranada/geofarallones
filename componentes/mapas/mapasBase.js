import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import XYZ from 'ol/source/XYZ';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import Graticule from 'ol/layer/Graticule';
import Stroke from 'ol/style/Stroke.js';

export function MapBase () {

  /**Mapas Base*/
  const osm = new TileLayer({
    title: 'OSM',
    type: 'base',
    visible: false,
    source: new OSM()
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
  const terrain = new TileLayer({
    title: 'Terrain',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
      layer: 'stamen_terrain_labels'
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
  //Retina tiles
  //https://api.maptiler.com/maps/basic-4326/?key=W5lV2tLMxZAza9GGxomX#2.0/52.99805/-113.51074
  //https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=W5lV2tLMxZAza9GGxomX
  const key = 'W5lV2tLMxZAza9GGxomX#2.0/52.99805/-113.51074';
  const attributionsTiles = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ';
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
  
  /**Grilla*/
  const grid = new Graticule({
    // the style to use for the lines, optional.
    strokeStyle: new Stroke({
      color: 'rgba(250,250,250,0.3)',
      width: 2,
      lineDash: [0.5, 4],
    }),
    title: 'Grid',
    //type: 'base',
    visible: false,
    showLabels: true,
    wrapX: false,
  });

  /**Grupo Mapas Base*/
  const baseMaps = new LayerGroup({
    title: 'Base maps',
    layers: [osm, watercolor, toner, outdoor, terrain, satelital]
  });

  return baseMaps;
}

export default MapBase;


