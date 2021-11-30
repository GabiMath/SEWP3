class Archivo {
  constructor() {
    this.apikey =
      "pk.eyJ1IjoiZ2FicmllbGFjb3kiLCJhIjoiY2t3ajYwZ281MHo4MDJwbWR6YzNxbnFuMyJ9.TLXLfFvZubjJ8-MM5nBkxQ";
    this.url =
      "https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=" +
      this.apikey;
  }

  procesar(archivos) {
    var archivo = archivos[0];
    var lector = new FileReader();
    lector.onload = this.mostrarMapa;
    lector.readAsText(archivo);
  }

  mostrarMapa(e) {
    var resultado = e.target.result;
    mapboxgl.accessToken = "pk.eyJ1IjoiZ2FicmllbGFjb3kiLCJhIjoiY2t3ajYwZ281MHo4MDJwbWR6YzNxbnFuMyJ9.TLXLfFvZubjJ8-MM5nBkxQ";
    const mapaGeoposicionado = new mapboxgl.Map({
      container: "mapa",
      style: "mapbox://styles/mapbox/light-v10",
      center: [ -74.297333, 4.570868 ],
      zoom: 4,
    });


    resultado = JSON.parse(resultado)
    
    console.log(resultado)
    mapaGeoposicionado.on("load", () => {
      // Add an image to use as a custom marker
      mapaGeoposicionado.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          mapaGeoposicionado.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          mapaGeoposicionado.addSource("points", {
            type: "geojson",
            data: resultado
          });

          // Add a symbol layer
          mapaGeoposicionado.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
  }

}

var archivo = new Archivo();
