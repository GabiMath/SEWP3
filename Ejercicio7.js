class Documento {
  constructor() {
    this.aportes = [
      "Popularización ordenadores personales",
      "Creación del S.O. Windows",
      "Ayuda en salvación de Apple",
      "Fundación Bill y Melinda Gates",
      "Máquina que genera agua potable y electricidad sostenible",
    ];
    this.contador = 0;
  }

  ocultarParrafos() {
    $("p").hide();
  }

  mostrarParrafos() {
    $("p").show();
  }

  tituloMasInformativo() {
    $("h1").text(
      "Biografía de William Henry Gates III y acciones de su empresa"
    );
  }

  tituloMenosInformativo() {
    $("h1").text("Bill Gates");
  }

  accionesMasDescripcion() {
    $("#acciones").text(
      "Microsoft Corporation es una empresa de tecnología, que desarrolla, otorga licencias y, además, es compatible con una amplia gama de productos de software, servicios y dispositivos. Los principales segmentos de la empresa son: la productividad y procesos de negocio, la nube inteligente y más informática personal. Los productos de la empresa incluyen, entre otros: sistemas operativos; aplicaciones de productividad para múltiples dispositivos (cross-device; aplicaciones de servidor; aplicaciones de soluciones de negocios; herramientas de gestión de escritorio y servidor; herramientas de desarrollo de software; videojuegos y, además de formación y certificación de integradores y desarrolladores de sistemas informáticos. También diseña, fabrica y vende dispositivos, entre otros: ordenares personales (PC), tabletas, consolas de juegos y de entretenimiento, teléfonos, otros dispositivos inteligentes y accesorios relacionados, que se integran con sus ofertas basadas en la nube. Ofrece una amplia gama de servicios, entre la que se incluyen las soluciones basadas en la nube que proporcionan a los clientes software, servicios, plataformas y contenido y, además, ofrece soporte técnico, así como servicios de consultoría."
    );
  }

  accionesMenosDescripcion() {
    $("#acciones").text(
      "A continuación se muestran las acciones de Microsoft."
    );
  }

  añadirAporte() {
    if (this.contador >= this.aportes.length) {
      this.quitarAportes();
      this.contador = 0;
    } else {
      $("#aportes").append("<li>" + this.aportes[this.contador] + "</li>");
      this.contador++;
    }
  }

  quitarAportes() {
    $("#aportes li").remove();
  }

  recorrerDOM() {
    $("*", document.body).each(function () {
      var etiquetaPadre = $(this).parent().get(0).tagName;
      $(this).prepend(
        document.createTextNode(
          "Etiqueta padre : <" +
            etiquetaPadre +
            "> elemento : <" +
            $(this).get(0).tagName +
            "> valor: "
        )
      );
    });
    $('input[value="Recorrer DOM"]').attr("disabled", "disabled");
  }

  sumarFilas() {
    var suma = 0;
    $("table tr td").each(function (i) {
      if (i == 0) {
        $("table tr").eq(0).append("<th>Total</th>");
      } else if (i % 4 == 0) {
        $("table tr")
          .eq(i / 4)
          .append("<td>" + suma + "</td>");
        suma = 0;
      }
      var celda = $.trim($(this).text());
      if (celda.length != 0 && parseFloat(celda) == parseFloat(celda)) {
        suma += parseFloat(celda);
      }
    });
    if (suma != 0) {
      $("table tr")
        .eq(12)
        .append("<td>" + suma + "</td>");
    }

    $('input[value="Sumar Filas"]').attr("disabled", "disabled");
  }

  sumarColumnas() {
    var suma = 0;
    var col1 = 0;
    var col2 = 0;
    var col3 = 0;
    var col4 = 0;
    var col5 = 0;
    $("table tr").each(function () {
      var celda1 = $(this).find("td").eq(0).text();
      var celda2 = $(this).find("td").eq(1).text();
      var celda3 = $(this).find("td").eq(2).text();
      var celda4 = $(this).find("td").eq(3).text();
      var celda5 = $(this).find("td").eq(4).text();
      if ((celda1.length != 0) & (celda1 != "-")) {
        col1 = parseFloat(celda1) + col1;
      }
      if ((celda2.length != 0) & (celda2 != "-")) {
        col2 = parseFloat(celda2) + col2;
      }
      if ((celda3.length != 0) & (celda3 != "-")) {
        col3 = parseFloat(celda3) + col3;
      }
      if ((celda4.length != 0) & (celda4 != "-")) {
        col4 = parseFloat(celda4) + col4;
      }
      if ((celda5.length != 0) & (celda5 != "-")) {
        col5 = parseFloat(celda5) + col5;
      }
    });
    $("table tr:last td").eq(0).append(col1);
    $("table tr:last td").eq(1).append(col2);
    $("table tr:last td").eq(2).append(col3);
    $("table tr:last td").eq(3).append(col4);
    if ($("table tr:last td").eq(4).length == 0) {
      $("table tr:last")
        .append("<td>" + col5 + "</td>");
    }
    $('input[value="Sumar Columnas"]').attr("disabled", "disabled");
  }
}


var documento = new Documento();
