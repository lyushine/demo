/**
 * User: Amio
 * Date: 5/9/13
 */

(function (window){
  var GM = google.maps;

  var app = {
    initialize: function (){
      // Init map
      var mapCanvas = document.getElementById('map-canvas'),
          mapOptions = {
            center: new GM.LatLng(-34.397, 150.644),
            zoom: 9,
            mapTypeId: GM.MapTypeId.ROADMAP
          };
      window.map = new GM.Map(mapCanvas, mapOptions);

      // Init markers
      GM.event.addListenerOnce(map, 'idle', function (){
        app.initMarkers(20);
      });

      // Change markers style on zoom
      GM.event.addListener(map, 'zoom_changed', function (){
        app.markers.forEach(function (mk, index){
          updateMarkerIcon(mk);
        });
      });
    },

    initMarkers: function (num){
      app.markers = [];

      // Auto Generate Markers by num
      for (var i = num; i--;) {
        setTimeout(function (){
          app.genMarker(app.randomLatLng());
        }, 90 * i);
      }

      // Create an Marker when click
      GM.event.addListener(map, 'click', function (e){
        var mk = app.genMarker(e.latLng);
      });
    },

    // Create an Marker by GM.latLng
    genMarker: function (latLng){
      var mk = new GM.Marker({
        title: latLng.toString(),
        position: latLng,
        draggable: true,
        animation: GM.Animation.DROP,
        optimized: false
      });

      app.markers.push(mk);
      updateMarkerIcon(mk);
      mk.setMap(map);

      return mk;
    },

    // Generate a random GM.LatLng object inside the viewport
    randomLatLng: function (){
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast(),
          sw = bounds.getSouthWest();
      return new GM.LatLng(
          Math.random() * ( ne.lat() - sw.lat() ) * 0.9 + sw.lat(),
          Math.random() * ( ne.lng() - sw.lng() ) * 1.2 + sw.lng()
      );
    }
  };

  window.app = app;

  // Animation
  function updateMarkerIcon(marker){
    var icons = {
      geo: new GM.MarkerImage('images/geo.png', null, null, null, new GM.Size(31, 53)),
      hotelname: new GM.MarkerImage('images/hotelname.png', null, null, null, new GM.Size(126, 85))
    };
    var type = window.map.getZoom() < 12 ? 'geo' : 'hotelname';
    marker.setIcon(icons[type]);
  }

  function toggleBounce(marker){
    if (marker.getAnimation() != null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  document.addEventListener("DOMContentLoaded", app.initialize, false);
})(this);
