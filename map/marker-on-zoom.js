/**
 * User: Amio
 * Date: 5/9/13
 */

(function (window){
  var GM = google.maps;

  var app = {
    initialize: function(){
      // Init Map
      var mapCanvas = document.getElementById('map-canvas'),
          mapOptions = {
            center: new GM.LatLng(-34.397, 150.644),
            zoom: 9,
            mapTypeId: GM.MapTypeId.ROADMAP
          };
      window.map = new GM.Map(mapCanvas, mapOptions);

      app.initMarkers(10);

      // change style on zoom
      GM.event.addListener(map, 'zoom_changed', function (){
        var zoomLevel = this.getZoom();
        console.log(zoomLevel);
        if (zoomLevel) {
          app.markers.forEach(function (mk, index){
            updateMarkerIcon(mk);
          });
        }
      });
    },

    initMarkers: function(num){
      app.markers = [];

//      for(var i = num, mk; i--;){
//        mk = new GM.Marker({
//          position: '',
//          dragable: true,
//          optimized: false
//        })
//      }

      GM.event.addListener(map, 'click', function (e){
        var marker = new GM.Marker({
          position: e.latLng,
          draggable: true,
          optimized: false
        });

        app.markers.push(marker);
        updateMarkerIcon(marker);
        marker.setMap(map);
      });
    }
  };

  window.app = app;

  // Animation
  function updateMarkerIcon(marker){
    var icons = {
      mari: new GM.MarkerImage('images/marijuana.png', null, null, null, new GM.Size(16, 18)),
      star: 'images/star.png'
    };
    var type = window.map.getZoom() < 9 ? 'mari' : 'star';
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