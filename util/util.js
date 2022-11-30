const moment = require('moment-timezone');

/// PEGAR HORÁRIO ATUAL (São Paulo)
function atualizarTempo() {
  return moment().tz("America/Sao_Paulo").locale("pt-br").format('LTS');
};

/// CRIAR DELAY PARA EXECUTAR ALGO 
/// t = tempo
function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}


/// SISTEMA DE FILA PARA ATENDIMENTO DE CONSULTORIA
class Queue {
  constructor() {
    this.elements = [];
  }
  // enqueue method adds an element at the end of the queue 
  enqueue(e) {
    // insert the new element 
    this.elements.push(e);
  }
  // remove an element from the front of the queue
  dequeue() {
    return this.elements.shift();
  }
  // check if the queue is empty
  isEmpty() {
    return this.elements.length == 0;
  }
  // get the element at the front of the queue
  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }
  // to query the length of a queue
  length() {
    return this.elements.length;
  }
}

/// SISTEMA DE FILA PARA ATENDIMENTO DE SERVIÇOS
class QueueServ {
  constructor() {
    this.elements = [];
  }
  // enqueue method adds an element at the end of the queue 
  enqueue(e) {
    // insert the new element 
    this.elements.push(e);
  }
  // remove an element from the front of the queue
  dequeue() {
    return this.elements.shift();
  }
  // check if the queue is empty
  isEmpty() {
    return this.elements.length == 0;
  }
  // get the element at the front of the queue
  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }
  // to query the length of a queue
  length() {
    return this.elements.length;
  }
}

/// SISTEMA DE FILA PARA ATENDIMENTO DE CONTRATAÇÃO DE PLANOS
class QueuePlano {
  constructor() {
    this.elements = [];
  }
  // enqueue method adds an element at the end of the queue 
  enqueue(e) {
    // insert the new element 
    this.elements.push(e);
  }
  // remove an element from the front of the queue
  dequeue() {
    return this.elements.shift();
  }
  // check if the queue is empty
  isEmpty() {
    return this.elements.length == 0;
  }
  // get the element at the front of the queue
  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }
  // to query the length of a queue
  length() {
    return this.elements.length;
  }
}

// to create a neq queue from the Queue() contructor function
let fila = new Queue();
let filaservico = new QueueServ();
let filaplano = new QueuePlano();

// to enqueue numbers from 1 to 7 
//for (let i = 1; i <= 7; i++){
//  fila.enqueue(i);  
//}

// to get the value of the q variable 
//console.log(fila);

// to get the number at the front of the queue 
//console.log(`Number at the front of the queue: ${fila.peek()}`);

//to get the current length of the queue
//console.log(`The length of the queue: ${fila.length()}`);

// to remove the element at the front of the queue (dequeue all elements)
//while (!fila.isEmpty()) {
//  console.log(fila.dequeue());
//}

function validarCNPJ(cnpj) {

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return false;

  if (cnpj.length != 14)
    return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  // Validador de Digito Verificador (últimos dois digitos) com base no algoritmo do CNPJ
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return false;

  return true;

}

/// CALCULAR PORCENTAGEM
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

//let tempo = atualizarTempo();
//console.log("TEMPO: " + tempo);


/// IDENTIFICAR SE ESTAMOS EM HORÁRIO DE EXPEDIENTE OU NÃO \\\
const horarios = ["00", "01", "02", "03", "04", "05", "06", "07", "12", "13:00", "13:01", "13:02", "13:03", "13:04", "13:05", "13:06", "13:07", "13:08", "13:09", "13:10", "13:11", "13:12", "13:13", "13:14", "13:15", "13:16", "13:17", "13:18", "13:19", "13:20", "18", "19", "20", "21", "22", "23"];
regexForaExpediente = new RegExp('^(?:' + horarios.join('|') + ')\\b');

//const expediente = ["08", "09", "10", "11", "13", "14", "15", "16", "17"];
//regex_expediente = new RegExp('^(?:' + expediente.join('|') + ')\\b');

module.exports = {
  atualizarTempo,
  regexForaExpediente,
  validarCNPJ,
  delay,
  percentage,
  fila,
  filaservico,
  filaplano
}