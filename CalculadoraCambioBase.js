class CalculadoraCambioBase {
  constructor() {
    this.pila = new Array();
    this.display = "";
    document.addEventListener("keydown", (evento) => {
      calculador.teclado(evento.key);
    });
  }

  digito(numero) {
    this.display += numero.toString();
    document.getElementById("actual").innerHTML = this.display;
  }

  cambioBase2() {
    var resultado = Number(this.display).toString(2);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase3() {
    var resultado = Number(this.display).toString(3);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase5() {
    var resultado = Number(this.display).toString(5);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase7() {
    var resultado = Number(this.display).toString(7);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase8() {
    var resultado = Number(this.display).toString(8);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase10() {
    var resultado = Number(this.display).toString(10);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase12() {
    var resultado = Number(this.display).toString(12);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase16() {
    var resultado = Number(this.display).toString(16);
    document.getElementById("display").innerHTML = resultado;
  }

  cambioBase20() {
    var resultado = Number(this.display).toString(20);
    document.getElementById("display").innerHTML = resultado;
  }

  borrar() {
    var nuevo = this.display.substring(0, this.display.length - 1);
    this.display = nuevo;
    document.getElementById("display").innerHTML = this.display;
  }

  borrarTodo() {
    this.display = "";
    document.getElementById("display").innerHTML = this.display;
    document.getElementById("actual").innerHTML = "";
  }

  teclado(evento) {
    const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (numeros.includes(evento.key)) {
      this.digito(evento.key);
    } else if (evento.key == "Backspace") {
      this.borrar();
    } else if (evento.key == "Delete") {
      this.borrarTodo();
    } else if (evento.key == "b") {
      this.cambioBase2();
    } else if (evento.key == "o") {
      this.cambioBase8();
    } else if (evento.key == "d") {
      this.cambioBase10();
    } else if (evento.key == "h") {
      this.cambioBase16();
    }
  }
}

var calculador = new CalculadoraCambioBase();

