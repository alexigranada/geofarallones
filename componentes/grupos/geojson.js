import LayerGroup from 'ol/layer/Group';
import PNNFarallones from "../capas/geojson";

export function PlotFarallones() {
    /**Grupo Utilidades*/
  const dataFarallones = new LayerGroup({
    title: 'Cartografia',
    layers: [PNNFarallones()]
  });

  return dataFarallones;
}

export default PlotFarallones;