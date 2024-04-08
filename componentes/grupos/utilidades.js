import OSM from 'ol/source/OSM';
import { OverviewMap, ScaleLine } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';

export function MiniMapa () {
  /**MiniMapa*/
  const source = new OSM();
  const overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: source,
      }),
    ],
  });

  return overviewMapControl;
}

export function ScaleControl() {
  /**Scale Control*/
  const scaleControl = new ScaleLine({
      units: 'metric',
      //bar: true,
      steps: 4,
      text: true,
      minWidth: 140,
  });

  return scaleControl;
}

export function MouseControlPosition() {
  /**Pocisión del Mause */
  const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      //className: 'custom-mouse-position',
      //target: document.getElementById('mouse-position'),
  });
  
  return mousePositionControl;
}

export default {MiniMapa, ScaleControl, MouseControlPosition};