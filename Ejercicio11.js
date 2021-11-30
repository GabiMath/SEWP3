"use strict";
class Geolocalización {
    constructor (){
    }

    mapa(){
        const centro = {lat: 43.3548057, lng: -5.8534646};
        const mapaGeoposicionado = new google.maps.Map(document.getElementById('mapa'),{
            zoom: 11,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        const marker = new google.maps.Marker({
            position: centro,
            map: mapaGeoposicionado,
          });
    }

}
var miPosicion = new Geolocalización();