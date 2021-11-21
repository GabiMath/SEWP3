class Calculadora {
  constructor() {
    this.display = "0";
    this.memoria = 0;
    this.mem = 0;
    this.contador = 0;
    this.resultado = "";

    document.addEventListener('keydown', (evento) => {
      this.teclado(evento)
    });
    

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
      evento.preventDefault()
      this.igual();
    }
  }
}

class CalculadoraCientifica extends Calculadora {
  constructor() {
    super();
    this.contadorHiperbolicos = 0;
    this.contadorInversos = 0;
    this.notacion = "";
    this.contadorNotacion = 0;
  }

  mr(){
    this.display = this.mem;
    document.getElementById("display").innerHTML = this.display;
  }

  ms(){
    this.mem = this.display;
  }

  /**Extiende método igual para las demás operaciones */
  
  operar() {
    if (this.resultado == "") {
      this.igual();
    } else {
      this.resultado = this.resultado.replace(
        "$",
        this.display[this.display.length - 1]
      );
      console.log(this.resultado);
      this.resultado = eval(this.resultado);
      this.display = this.resultado;
      document.getElementById("display").innerHTML = this.display;
      this.resultado = "";
    }
  }

  /**Devuelve la forma del número con el operador 10^x, x^2, x^y, Mod, +-, !
   * con Number y con la función de Math si aplica
   */

  operadoresEspeciales(operador) {
    var numeros = this.display.match(/\d+\.*\d*/g);
    var numero = numeros[numeros.length - 1];
    var numeroConOperador = "";
    var numeroDisplay = "";
    if (operador == "10^") {
      numeroConOperador = "Math.pow(10," + "Number(" + numero.toString() + "))";
      numeroDisplay = "10^" + numero.toString();
    } else if (operador == "x^") {
      numeroConOperador = "Math.pow(Number(" + numero.toString() + "), 2)";
      numeroDisplay = numero.toString() + "^2";
    } else if (operador == "x^y") {
      numeroConOperador =
        "Math.pow(Number(" + numero.toString() + "), Number($))";
      numeroDisplay = numero.toString() + "^";
    } else if (operador == "Mod") {
      numeroConOperador = "Number(" + numero.toString() + ")%" + "Number($)";
      numeroDisplay = numero.toString() + "%";
    } else if (operador == "+-") {
      numeroConOperador = "-Number(" + numero.toString() + ")";
      /**var tamano = this.display.length - numero.length;
      if (this.display.length > numero.length && this.display.substring(tamano-1, tamano) == '-') {*/
      numeroDisplay = "(-" + numero.toString() + ")";
      /**       }*/
    } else if (operador == "!") {
      numeroConOperador = "Number(" + this.factorial(Number(numero)) + ")";
      numeroDisplay = numero.toString() + "!";
    }
    this.operador(numeroConOperador, numeroDisplay);
  }

  /**Devuelve la forma del número con el operador sin, cos, tan, sinh, cosh, tanh
   *con Number y con la función de Math
   */

  operadoresTrigonometricos(operador) {
    var numeros = this.display.match(/\d+\.*\d*/g);
    var numero = numeros[numeros.length - 1];
    if (document.getElementById("DEG").value == "DEG") {
      numero = (numero * Math.PI) / 180;
    }
    const inversos = ["sin^{-1}", "cos^{-1}", "tan^{-1}"];
    if (inversos.includes(operador)) {
      var nuevoOperador = operador.substring(0, 3);
      var numeroConOperador =
        "1/" + "Math." + nuevoOperador + "(Number(" + numero.toString() + "))";
    } else {
      var numeroConOperador =
        "Math." + operador + "(Number(" + numero.toString() + "))";
    }
    var numeroDisplay =
      operador + "(" + numeros[numeros.length - 1].toString() + ")";
    this.operador(numeroConOperador, numeroDisplay);
  }

  /**Devuelve la forma del número con el operador
   * log, sqrt, exp con Number y con la función de Math
   */

  operadoresUnNumero(operador) {
    var numeros = this.display.match(/\d+\.*\d*/g);
    var numero = numeros[numeros.length - 1];
    const inversos = ["sin^{-1}", "cos^{-1}", "tan^{-1}"];
    if (inversos.includes(operador)) {
      var nuevoOperador = operador.substring(0, 3);
      var numeroConOperador =
        "1/" + "Math." + nuevoOperador + "(Number(" + numero.toString() + "))";
    } else {
      var numeroConOperador =
        "Math." + operador + "(Number(" + numero.toString() + "))";
    }
    var numeroDisplay = operador + "(" + numero.toString() + ")";
    this.operador(numeroConOperador, numeroDisplay);
  }

  notacionCientifica() {
    if (this.contadorNotacion == 0) {
      var numeros = this.display.match(/\d+\.*\d*/g);
      this.notacion = numeros[numeros.length - 1];
      this.display =
        this.display.substring(0, this.display.length - this.notacion.length) +
        Number(this.notacion).toExponential();
      document.getElementById("display").innerHTML = this.display;
      this.contadorNotacion++;
    } else {
      this.display =
        this.display.substring(0, this.display.length - Number(this.notacion).toExponential().length) +
        this.notacion;
      document.getElementById("display").innerHTML = this.display;
      this.contadorNotacion = 0;
    }
  }

  radianes(valor) {
    if (valor == "DEG") {
      document.getElementById("DEG").value = "RAD";
    } else {
      document.getElementById("DEG").value = "DEG";
    }
  }

  hiperbolicos() {
    if (this.contadorHiperbolicos == 0) {
      document.getElementById("sin").value = "sinh";
      document.getElementById("cos").value = "cosh";
      document.getElementById("tan").value = "tanh";
      this.contadorHiperbolicos++;
    } else {
      document.getElementById("sin").value = "sin";
      document.getElementById("cos").value = "cos";
      document.getElementById("tan").value = "tan";
      this.contadorHiperbolicos = 0;
    }
  }

  inversos() {
    if (this.contadorInversos == 0) {
      document.getElementById("sin").value = "sin^{-1}";
      document.getElementById("cos").value = "cos^{-1}";
      document.getElementById("tan").value = "tan^{-1}";
      this.contadorInversos++;
    } else {
      document.getElementById("sin").value = "sin";
      document.getElementById("cos").value = "cos";
      document.getElementById("tan").value = "tan";
      this.contadorInversos = 0;
    }
  }

  operador(numeroConOperador, numeroDisplay) {
    var numeros = this.display.match(/\d+\.*\d*/g);
    var numero = numeros[numeros.length - 1];
    this.resultado =
      this.display.substring(0, this.display.length - numero.length) +
      numeroConOperador;
    this.display =
      this.display.substring(0, this.display.length - numero.length) +
      numeroDisplay;
    document.getElementById("display").innerHTML = this.display;
  }

  borrar() {
    this.display = this.display.substring(0, this.display.length - 1);
    document.getElementById("display").innerHTML = this.display;
  }

  pi() {
    var numero = Math.PI;
    this.digito(numero);
  }

  factorial(n) {
    var total = 1;
    for (var i = 1; i <= n; i++) {
      total = total * i;
    }
    return total;
  }

  teclado(evento){
    const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const operadores = ["*", "/", "+", "-"];
    if (numeros.includes(evento.key) || operadores.includes(evento.key)) {
      this.digito(evento.key);
    } else if (evento.key == "Backspace") {
      this.borrar();
    } else if(evento.key == "Delete"){
      this.borrarTodo();
    } else if (evento.key == "Enter") {
      evento.preventDefault()
      this.operar();
    } else if (evento.key == 's'){
      if (document.getElementById("sin").value == "sin^{-1}"){
        this.operadoresTrigonometricos('sin^{-1}');
      } else if (document.getElementById("sin").value == "sinh"){
        this.operadoresTrigonometricos('sinh');
      } else {
        this.operadoresTrigonometricos('sin');
      }
    } else if (evento.key == 'c'){
      if (document.getElementById("cos").value == "cos^{-1}"){
        this.operadoresTrigonometricos('cos^{-1}');
      } else if (document.getElementById("cos").value == "cosh"){
        this.operadoresTrigonometricos('cosh');
      } else {
        this.operadoresTrigonometricos('cos');
      }
    } else if (evento.key == 't'){
      if (document.getElementById("tan").value == "tan^{-1}"){
        this.operadoresTrigonometricos('tan^{-1}');
      } else if (document.getElementById("tan").value == "tanh"){
        this.operadoresTrigonometricos('tanh');
      } else {
        this.operadoresTrigonometricos('tan');
      }
    } else if (evento.key == 'h'){ 
      this.hiperbolicos();
    } else if (evento.key == 'l'){
      this.operadoresUnNumero('log');
    } else if (evento.key == 'q'){
      this.operadoresUnNumero('sqrt');
    } else if (evento.key == 'e'){
      this.operadoresUnNumero('exp');
    } else if (evento.key == '!'){
      this.operadoresEspeciales('!')
    } else if (evento.key == '{'){
      this.operadoresEspeciales('x^');
    } else if (evento.key == 'y'){
      this.operadoresEspeciales('x^y');
    } else if (evento.key == '%'){
      this.operadoresEspeciales('Mod');
    } else if (evento.key == 'n'){
      this.operadoresEspeciales('+-');
    } else if (evento.key == 'd'){
      this.operadoresEspeciales('10^');
    } else if (evento.key == 'm'){
      this.ms();
    } else if (evento.key == 'r'){
      this.mr();
    } else if (evento.key == 'g'){
      this.mMas();
    } else if (evento.key == 'f'){
      this.mMenos();
    } else if (evento.key == 'j'){
      this.mrc();
    } else if (evento.key == 'i'){
      this.inversos();
    }
  }
}

var calculador = new CalculadoraCientifica();
