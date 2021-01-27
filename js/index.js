mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YW1hbiIsImEiOiJja2tldGR4a28wMTI4MnBvNTZwNDZ4MmJlIn0.tNAqdVcfPOW_sBZd9Hk3Bw';

navigator.geolocation.getCurrentPosition(sucessLocation, errorLocation, { enableHighAccuracy: true });

function sucessLocation(position) {
  console.log(position);
  setup( [position.coords.longitude , position.coords.latitude] );
}

function errorLocation() {
  setup( [28.3949 , 84.1240] );
}

function setup(center) {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11' ,
    center: center ,
    zoom: 15
  });
}