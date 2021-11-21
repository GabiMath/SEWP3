class CalculadoraRPN {
  constructor() {
    this.pila = new Array();
    this.display = "";
    this.numero = "";

    document.addEventListener('keydown', (evento) => {
      this.teclado(evento)
    });
  }

  pantalla(numero) {
    this.numero += numero;
    document.getElementById("actual").innerHTML = this.numero;
  }

  apilar() {
    if(this.numero.length!=0){
        this.pila.push(this.numero);
        this.numero = "";
        this.mostrar();
    }
    else{
        this.error("Ingrese algún número para apilarlo");
    }
  }

  error(mensaje){
    this.display = mensaje;
    document.getElementById("display").innerHTML = this.display;
    this.display = "";
    this.numero = "";
  }

  desapilar() {
    if (this.numero!=""){
        var numero = this.numero.substring(0, this.numero.length-1);
        this.numero = numero;
        document.getElementById("actual").innerHTML = this.numero;
    }
    else{
        this.pila.pop();
        this.mostrar();
    }
    
  }

  mostrar() {
    this.numero = "";
    document.getElementById("actual").innerHTML = this.numero;
    var stringPila = "";
    for (var i = this.pila.length - 1; i >= 0; i--)
      stringPila += "<span>" + this.pila[i] + "</span>";
    this.display = stringPila;
    document.getElementById("display").innerHTML = this.display;
  }

  exp() {
    var resultado = Number(this.pila.pop()) + Number(this.pila.pop());
    this.numero = resultado;
    this.apilar();
    this.mostrar();
    console.log(resultado);
  }

  sumar() {
    if (this.pila.length < 2){
        this.error("ERROR, ingrese otro número para efectuar la operación");
    }else{
        var resultado = Number(this.pila.pop()) + Number(this.pila.pop());
        this.numero = resultado;
        this.apilar();
        this.mostrar();
    }
  }

  restar() {
    if (this.pila.length < 2){
        this.error("ERROR, ingrese otro número para efectuar la operación");
    }else{
        var resultado = -Number(this.pila.pop()) + Number(this.pila.pop());
        this.numero = resultado;
        this.apilar();
        this.mostrar();
    }
  }

  multiplicar() {
    if (this.pila.length < 2){
        this.error("ERROR, ingrese otro número para efectuar la operación");
    }else{
        var resultado = Number(this.pila.pop()) * Number(this.pila.pop());
        this.numero = resultado;
        this.apilar();
        this.mostrar();
    }
  }

  dividir() {
    if (this.pila.length < 2){
        this.error("ERROR, ingrese otro número para efectuar la operación");
    }else{
        var resultado = (1 / Number(this.pila.pop())) * Number(this.pila.pop());
        this.numero = resultado;
        this.apilar();
        this.mostrar();
    }
  }

  seno() {
    var resultado = Math.sin(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  pi() {
    var resultado = Math.PI;
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  coseno() {
    var resultado = Math.cos(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  tangente() {
    var resultado = Math.tan(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  sqrt() {
    var resultado = Math.sqrt(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  arcsen() {
    var resultado = Math.asin(Number(this.pila.pop()));
    console.log(resultado)
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  arccos() {
    var resultado = Math.acos(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  arctan() {
    var resultado = Math.atan(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  borrarTodo() {
    this.pila.length = 0;
    this.mostrar();
  }

  log() {
    var resultado = Math.log(Number(this.pila.pop()));
    this.numero = resultado;
    this.apilar();
    this.mostrar();
  }

  teclado(evento) {
    const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (numeros.includes(evento.key)) {
      this.pantalla(evento.key);
    } else if (evento.key == "Backspace") {
      this.desapilar();
    } else if (evento.key == "Delete") {
      this.borrarTodo();
    } else if (evento.key == "Enter") {
      evento.preventDefault();
      this.apilar();
    } else if (evento.key == "+") {
      this.sumar();
    } else if (evento.key == "-") {
      this.restar();
    } else if (evento.key == "*") {
      this.multiplicar();
    } else if (evento.key == "/") {
      this.dividir();
    } else if (evento.key == "s") {
      this.seno();
    } else if (evento.key == "c") {
      this.coseno();
    } else if (evento.key == "t") {
      this.tangente();
    } else if (evento.key == "S") {
      this.arcsen();
    } else if (evento.key == "C") {
      this.arccos();
    } else if (evento.key == "T") {
      this.arctan();
    } else if (evento.key == "e") {
      this.exp();
    } else if (evento.key == "l") {
      this.log();
    } else if (evento.key == "q") {
      this.sqrt();
    } else if (evento.key == "p") {
      this.pi();
    }
  }
}

var calculador = new CalculadoraRPN();
