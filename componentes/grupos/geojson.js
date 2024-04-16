import LayerGroup from 'ol/layer/Group';
import {PNNFarallones, AD_Pance} from "../capas/geojson";

export function PlotFarallones() {
    /**Grupo Utilidades*/
  const dataFarallones = new LayerGroup({
    title: 'Cartografia',
    layers: [PNNFarallones(), AD_Pance()]
  });

  return dataFarallones;
}

export default PlotFarallones;