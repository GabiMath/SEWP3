"use strict";
class Petroleo {
  constructor() {
    this.apikey =
      "zitp3n5n89f7ia7j5l2d3t15z5pri38zm87hzzud750ytx86m23ldsyzxj2u";
    this.endpoint = "timeseries";
    this.correcto =
      "¡Todo correcto! XML recibido de <a href='https://commodities-api.com/'>Commodities-api</a>";
  }

  cargarDatos(simbolo) {
    var url =
      "https://commodities-api.com/api/" +
      this.endpoint +
      "?access_key=" +
      this.apikey +
      "&base=BRENTOIL&symbols=" +
      simbolo +
      "&start_date=2021-10-01&end_date=2021-11-24";
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
      url: url,
      dataType: "json",
      success: function (json) {
        var rates = json["data"]["rates"];
        var datos = [];
        for (var i in rates) {
          datos.push({ x : new Date(i.substring(0,4), i.substring(5,7), i.substring(8,10)), y: rates[i][simbolo]});
        }

        console.log(datos)
        var chart = new CanvasJS.Chart("sampleChart", {
          title: {
            text: "Fluctuación del precio del petróleo",
          },
          axisX: {
            title: "Fecha"
          },
          axisY: {
            title: "Precio del petróleo",
          },
          data: [
            {
              type: "area",
              dataPoints: datos,
            },
          ],
        });

        chart.render();
      },
    });
  }
}
var petroleo = new Petroleo();
