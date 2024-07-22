import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Fill, Stroke } from 'ol/style';

export function PNNFarallones () {

    /** Cargamos los datos */
    const vectorSource = new VectorSource({
      url: 'Datos/geojson/PNN_Farallones.geojson',
      format: new GeoJSON(),
    });

    /** Creamos el vector */
    const vector = new VectorLayer({
      source: vectorSource,
      title: 'PNN Farallones de Cali',
      visible: false,
      style: new Style({
        fill: new Fill({
          color: [0, 255, 0, 0.2] }),
        stroke: new Stroke({
          color: 'rgba(0, 255, 0, 1.0)',
          width: 2,
        }),
      }),
    });

    return vector;
}

export function AD_Pance () {

  /** Cargamos los datos */
  const vectorSource = new VectorSource({
    url: 'Datos/geojson/Area_Drenaje_Pance.geojson',
    format: new GeoJSON(),
  });

  /** Creamos el vector */
  const vector = new VectorLayer({
    source: vectorSource,
    title: 'Cuenca rio Pance',
    visible: false,
    style: new Style({
      fill: new Fill({
        color: [0, 255, 255, 0.2] }),
      stroke: new Stroke({
        color: 'rgba(0, 255, 255, 1.0)',
        width: 2,
      }),
    }),
  });

  return vector;
}

export default {PNNFarallones, AD_Pance};