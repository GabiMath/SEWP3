class Archivo {
  constructor() {
    this.apikey =
      "pk.eyJ1IjoiZ2FicmllbGFjb3kiLCJhIjoiY2t3ajYwZ281MHo4MDJwbWR6YzNxbnFuMyJ9.TLXLfFvZubjJ8-MM5nBkxQ";
    this.url =
      "https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=" +
      this.apikey;
  }

  cargarArchivo(archivos) {
    var archivo = archivos[0];
    var lector = new FileReader();
    lector.onload = async (e) => {
      let result = await this.extraerCoordenadas(e.target.result)
      //Pasando la variable result que contiene el arreglo con las coordenadas.
      this.mostrarMapa(result);
    }
    lector.readAsText(archivo);
  }
  
  async extraerCoordenadas(plainText) {
    console.log("LLEGA");
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let googlePoints = []

    if (xmlDoc.documentElement.nodeName == "kml") {
      for (const item of xmlDoc.getElementsByTagName('Placemark')) {
        let placeMarkName = item.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
        let points = placeMarkName.split(",");

        /** Colocando los puntos de latitulo, longitud y altititud 
         * en el arreglo googlePoints **/
        googlePoints.push({ lat: +points[1], lng: +points[0], alt: +points[2] })
      }
    }
    return googlePoints;
  }

  mostrarMapa(e) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbGFjb3kiLCJhIjoiY2t3ajYwZ281MHo4MDJwbWR6YzNxbnFuMyJ9.TLXLfFvZubjJ8-MM5nBkxQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.297333, 4.570868],
      zoom: 5
    });


    e.forEach(element => {
      let p1 = element['lat'];
      let p2 = element['lng'];
      const marker1 = new mapboxgl.Marker({
        labelContent: "ABCD",
        labelAnchor: new mapboxgl.Point(15, 65),
        labelClass: "labels", // the CSS class for the label
        labelInBackground: false,
        color: "blue"
      })
        .setLngLat([p2, p1])
        .addTo(map);
    });


  }
}

var archivo = new Archivo();
