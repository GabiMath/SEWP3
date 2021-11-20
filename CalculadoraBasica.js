class Calculadora {
    constructor() {
      this.display = "0";
      this.memoria = 0;
      this.mem = 0;
      this.contador = 0;
      this.resultado = "";
    }
  
    /**Añade digitos al display */
  
    digito(numero) {
      if(this.display=="0"){
        this.display="";
      }
      this.display += numero.toString();
      document.getElementById("display").innerHTML = this.display;
    }
  
    /**Borra todo lo que esté en pantalla */
  
    borrarTodo() {
      this.display = "0";
      document.getElementById("display").innerHTML = this.display;
    }
  
    /**Guarda número en memoria y resta esa misma cantidad a la memoria cuando se vuelve a presionar */
  
    mMenos() {
      if (this.contador == 0) {
        this.mem = Number(this.display);
        this.memoria = this.mem;
      } else {
        this.memoria -= Number(this.mem);
      }
      this.display = this.memoria.toString();
      document.getElementById("display").innerHTML = this.display;
      this.contador++;
    }
  
    /**Guarda número en memoria y resta esa misma cantidad a la memoria cuando se vuelve a presionar */
  
    mMas() {
      if (this.contador == 0) {
        this.mem = Number(this.display);
        this.memoria = this.mem;
      } else {
        this.memoria += Number(this.mem);
      }
      this.display = this.memoria.toString();
      document.getElementById("display").innerHTML = this.display;
      this.contador++;
    }
  
    /**Elimina número en memoria */
  
    mrc() {
      this.memoria = 0;
      this.contador = 0;
      this.display = "0";
      document.getElementById("display").innerHTML = this.display;
    }
  
    /**Separar método en submétodos (uno para separar operadores y numeros)*/
  
    /**Evalúa la expresión con eval */
  
    igual() {
      var operadores = this.display.split(/[^-+*/()]/);
      var patronNumeros = /\d+\.*\d*/g;
      console.log(operadores);
      var numeros = this.display.match(patronNumeros);
      console.log(numeros);
      operadores = operadores.filter((blank) => blank != "");
      var numerosNumber = [];
      numeros.forEach((numero) => numerosNumber.push("Number(" + numero + ")"));
      var tamanoNumeros = numerosNumber.length;
      for (var i = 0; i < tamanoNumeros; i++) {
        if (operadores[0] == "(") {
          this.resultado += operadores[0];
          operadores.shift();
        }
        this.resultado += numerosNumber[0];
        numerosNumber.shift();
        if (operadores.length != 0) {
          this.resultado += operadores[0];
          operadores.shift();
        }
      }
      /**Método operar */
      console.log(this.resultado);
      this.resultado = eval(this.resultado);
      this.display = this.resultado;
      document.getElementById("display").innerHTML = this.display;
      this.resultado = "";
    }
  
    /**Eventos de teclado */
  
    teclado(evento) {
      const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      const operadores = ["*", "/", "+", "-"];
      if (numeros.includes(evento.key) || operadores.includes(evento.key)) {
        this.digito(evento.key);
      } else if (evento.key == "Backspace") {
        this.borrarTodo();
      } else if (evento.key == "Enter") {
        this.igual();
      }
    }
  }
var calculador = new Calculadora()

document.addEventListener('keydown', (evento) => {
  calculador.teclado(evento.key)
});
