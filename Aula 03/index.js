//Importando com "default export"
import soma from "./math/soma.js";
import { potencia } from "./math/utils.js";
import { percentual } from "./math/percentual.js";
//Importando com "named exports"
import  { subtracao }  from "./math/subtracao.js";
import { multiplicacao, divisao }  from "./math/utils.js";

//Testando as funções
console.log(`Soma: ${soma(10,5)}`);
console.log(`Subtração: ${subtracao(10,5)}`);
console.log(`Multiplicação: ${multiplicacao(10,5)}`);
console.log(`Divisão: ${divisao(10,5)}`);
console.log(`Potencia: ${potencia(100,100)}`);
console.log(`Percentual: ${percentual(10, 100, 10)}`);


