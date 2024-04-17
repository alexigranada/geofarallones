import './styleMapLibre.css'

const map = (window.map = new maplibregl.Map({
    container: 'map',
    zoom: 12,
    center: [-76.62, 3.33],
    pitch: 52,
    hash: true,
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
    maxPitch: 85
}));

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