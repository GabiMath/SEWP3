"use strict";
class Geolocalización {
    constructor (){
    }

    mapa(){
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.getElementById('mapa'),{
            zoom: 10,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        
        var infoWindow = new google.maps.InfoWindow();
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
                console.log(pos)
                
              }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
            }
          }
    
        handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: Ha fallado la geolocalización' :
                                  'Error: Su navegador no soporta geolocalización');
            infoWindow.open(mapaGeoposicionado);
          }

}
var miPosicion = new Geolocalización();