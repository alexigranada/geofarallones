import { Polygon } from 'ol/geom';
import './styleMapLibre.css'

/*const map = (window.Map = new maplibregl.Map({
    container: 'map',
    zoom: 12,
    center: [-76.62, 3.33],
    pitch: 52,
    hash: true,
    scaleControl: true,
    style: {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=W5lV2tLMxZAza9GGxomX#-0.2/0.00000/5.62500'],
                tileSize: 256,
                attribution: '&copy; OpenStreetMap Contributors',
                maxzoom: 19
            },
            // Use a different source for terrain and hillshade layers, to improve render quality
            terrainSource: {
                type: 'raster-dem',
                url: 'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=W5lV2tLMxZAza9GGxomX',
                tileSize: 256,
            }
        },
        layers: [
            {
                id: 'osm',
                type: 'raster',
                source: 'osm'
            }
        ],
        terrain: {
            source: 'terrainSource',
            exaggeration: 1
        }
    },
    maxZoom: 18,
    maxPitch: 85,
    })

    
);*/

map.addControl(
    new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
    })
);

map.addControl(
    new maplibregl.TerrainControl({
        source: 'terrainSource',
        exaggeration: 1
    })
);

//Add GeoJson
map.on('load', ()=>{
    map.addSource('my_maine',{
    'type': 'geojson',
    'data': 'Datos/geojson/Predios.geojson'
    });

    map.addSource('my_drenaje',{
        'type': 'geojson',
        'data': 'Datos/geojson/Drenaje_Principal.geojson'
        });

    map.addLayer({
        'id': 'my_layer',
        'type': 'fill',
        'source': 'my_maine',
        'layout': {},
        'paint': {
            'fill-color': '#00FF00',
            'fill-opacity': 0.25,
        } 
    });

    map.addLayer({
        'id': 'my_layer_line',
        'type': 'line',
        'source': 'my_maine',
        'layout': {},
        'paint': {
            'line-color': '#00FF00',
            'line-width': 1.5,
        }
    });

    map.addLayer({
        'id': 'my_drenaje',
        'type': 'line',
        'source': 'my_drenaje',
        'layout': {},
        'paint': {
            'line-color': '#0033FF',
            'line-width': 4,
        } 
    });
});

//Add popup
map.on('click', 'my_layer', (e) => { 
    new maplibregl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h4>' + 'Categoría: ' +'</h4><p>' + e.features[0].properties.categoria + '</p><h4>' + 'Nombre: ' + '</h4><p>' + e.features[0].properties.Nombre + '</p>')
    .addTo(map)
});

//Cambiar Cursor
map.on('mouseenter', 'my_layer', () => { 
    map.getCanvas().style.cursor = 'puntero'; 
}); 

// Cámbialo de nuevo a un puntero cuando salga. 
map.on('mouseleave', 'my_layer', function () { 
    map.getCanvas().style.cursor = ''; 
}); 

// Add geolocate control to the map.
map.addControl(
    new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

//Escala
let scale = new maplibregl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
});
map.addControl(scale);

//MiniMapa
map.on('load', function () {
    map.addControl(new maplibregl.Minimap(), 'top-left');
  });


/**Display a popup on hover */
// Create a popup, but don't add it to the map yet.
const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'my_drenaje', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.NOM1_DRENA;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    //while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //}

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates[[0]]).setHTML(description).addTo(map);
});

map.on('mouseleave', 'my_drenaje', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});