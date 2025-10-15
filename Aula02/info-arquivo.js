const fs = require('fs');
const path = require('path');

const argumentos = process.argv.slice(2);

const fileName = argumentos[0];
const filePath = path.resolve(fileName);

//Obter informações do arquivo

fs.stat(filePath, (err, stats) =>{
    if(err){
    console.error('Erro ao obter dados do arquivo.', err);
    return;
    }
    console.log('===Informações do Arquivo===');
    console.log(`Caminho Absoluto: ${filePath}`);
    console.log(`Tamanho: ${stats.size} bytes`);
    console.log(`Criado Em: ${stats.birthtime}`);
    console.log(`Modificado Em: ${stats.mtime}`);
    console.log(`É um Arquivo?: ${stats.isFile()}`);  
})



