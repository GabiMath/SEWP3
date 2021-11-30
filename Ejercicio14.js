class ArrastraFruta {
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev, fruta) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("fruta", fruta);
    console.log(ev+fruta)
  }

  drop(ev) {
    ev.preventDefault();
    console.log(ev)
    //alert(ev.target.id);
    var fruta = ev.dataTransfer.getData("fruta");
    var id = ev.dataTransfer.getData("id");
    if (fruta === "manzana" && ev.target.id === "div1") {
      alert("Moviendo manzana");
      ev.target.appendChild(document.getElementById(id));
    } else if (fruta === "fresa" && ev.target.id === "div2") {
      alert("Moviendo fresa");
      ev.target.appendChild(document.getElementById(id));
    } else if (fruta === "banana" && ev.target.id === "div3") {
      alert("Moviendo banana");
      ev.target.appendChild(document.getElementById(id));
    } else {
      alert("La " + fruta + " no va en esta caja.");
    }

    // Verificando soporte del navegador
    if (typeof Storage !== "undefined") {
      // Guardando en la variable frutaActual
      localStorage.setItem("frutaActual", fruta);
      // Recuperando el valor de frutaActual
      document.getElementById("ultimaFruta").innerHTML =
        localStorage.getItem("frutaActual");
    } else {
      document.getElementById("ultimaFruta").innerHTML =
        "Lo sentimos, su navegador no soporta alojamiento web...";
    }
  }

  cargarImagen() {
    var preview = document.querySelector("#drag3"); // Image reference
    var file = document.querySelector("input[type=file]").files[0]; // File refrence
    console.log(file);
    var reader = new FileReader(); // Creating reader instance from FileReader() API

    reader.addEventListener(
      "load",
      function () {
        // Setting up base64 URL on image
        preview.src = reader.result;
      },
      false
    );

    reader.readAsDataURL(file); // Converting file into data URL
  }
}

var fruta = new ArrastraFruta();
