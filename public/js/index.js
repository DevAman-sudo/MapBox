// DOM elements //
const searchBar = document.getElementById('geocoder');
const overlay = document.getElementById('map-overlay');


mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YW1hbiIsImEiOiJja2tldGR4a28wMTI4MnBvNTZwNDZ4MmJlIn0.tNAqdVcfPOW_sBZd9Hk3Bw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    attributionControl: false,
    center: [85.3240, 27.7172],
    zoom: 10,
    pitch: 60,
    bearing: -17.6,
    antialias: true
});

// search Map //
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: {
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.5, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.s
        easing: function (t) {
            return t;
        }
    },
    marker: {
        color: 'red'
    },
    mapboxgl: mapboxgl
});

searchBar.appendChild(geocoder.onAdd(map));


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );
});