"use strict";
class Meteo {
    constructor(){
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.ciudades = ["Bogotá", "Armenia", "Boyacá", "Girón", "Medellin"];
        this.codigoPais = "CO";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }

    mostrarCadaCiudad(){
        for (var i = 0; i < this.ciudades.length; i+=1) {
            this.verJSON(this.ciudades[i], i)
          }
    }

    cargarDatos(ciudad, posicion){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                    $("pre").eq(posicion).text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                    var urlIcono = "http://openweathermap.org/img/w/" + datos.weather[0].icon + ".png";
                    //Presentación de los datos contenidos en JSON
                    
                    var stringDatos = "<img src ='"+urlIcono+"' alt='"+datos.weather[0].description+"'/>";
                        stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                    
                    $("p").eq(posicion).html(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verJSON(ciudad, posicion){
              //Muestra el archivo JSON recibido
              this.crearElemento("h2","Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
              this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
              this.crearElemento("h4","JSON","footer"); // Crea un elemento con DOM        
              this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
              this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
              this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con JSON
              this.cargarDatos(ciudad, posicion);
              $("button").attr("disabled","disabled");
    }
}
var meteo = new Meteo();