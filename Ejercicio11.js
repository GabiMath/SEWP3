"use strict";
class Geolocalización {
  constructor() {

    this.lat1 = 43.3672702;
    this.lon1 = -5.8502461;
    this.lat2 = 43.3672702;
    this.lon2 = -5.8502461;
    
  }

  getCoor(){
    this.lon1 = Number(document.getElementById("lon1").value);
    this.lat1 = Number(document.getElementById("lat1").value);
    this.lon2 = Number(document.getElementById("lon2").value);
    this.lat2 = Number(document.getElementById("lat2").value);
  }

  mapa() {
    this.getCoor();
    console.log(this.lon1);
    console.log(this.lat1)
    console.log(this.lon2)
    console.log(this.lat2)
    var centro = { lat: this.lat1, lng: this.lon1 };
    console.log(centro)
    var mapaGeoposicionado = new google.maps.Map(
      document.getElementById("mapa"),
      {
        zoom: 10,
        center: centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
    );

    const marker1 = new google.maps.Marker({
      position: { lat: this.lat1, lng: this.lon1 },
      map: mapaGeoposicionado,
    });

    const marker2 = new google.maps.Marker({
      position: { lat: this.lat2, lng: this.lon2 },
      map: mapaGeoposicionado,
    });
    var distancia = this.getKilometros(this.lat1, this.lon1, this.lat2, this.lon2);
    document.getElementById("distancia").innerHTML = "<strong>Distancia:</strong> " + distancia;
  }

  getKilometros(lat1, lon1, lat2, lon2) {
    var rad = function (x) {
      return (x * Math.PI) / 180;
    };
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
  };
}
var miPosicion = new Geolocalización();
