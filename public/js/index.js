mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YW1hbiIsImEiOiJja2tldGR4a28wMTI4MnBvNTZwNDZ4MmJlIn0.tNAqdVcfPOW_sBZd9Hk3Bw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 13
});

// search Map //
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
        color: 'blue'
    },
    mapboxgl: mapboxgl
});

map.addControl(geocoder);


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());