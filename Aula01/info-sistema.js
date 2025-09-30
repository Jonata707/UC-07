//Importando módulos nativos do Node.js
// 'os' fornece informações sobre o sistema operacional
const os = require('os');
//'path' permite manipular e trabalhar com caminhos de arquivos
const path = require('path');
//'fs' permite interagir com o sistema de arquivos (ler, escrever, listar...)
const fs = require('fs');


//Exibindo informações do sistema operacional
console.log('=== INFORMAÇÕES DO SISTEMA ===');
console.log('Plataforma: ', os.platform());//Exibe o sistema operacional
console.log('Arquitetura', os.arch());//Exibe a arquitetura do processador
console.log('Memória Total:' ,Math.round(os.totalmem() /1024 /1024 / 1024)+ 'GB');
//Exibe o total de memória RAM
console.log('Memória Total:' ,Math.round(os.freemem() /1024 /1024 / 1024)+ 'GB');
//Exibe o total de memória RAM livre

//Exibindo informações de arquivos e diretorias

console.log('=== INFORMAÇÕES DO CAMINHO ===');
console.log('Diretoria atual:', __dirname);
//Caminho absoluot da diretoria atual
console.log('Diretoria atual:', __filename);
//Caminho absoluot do arquivo atual
console.log('Extensão do arquivo', path.extname(__filename));
//Extenão do arquivo atual



console.log('\n === ARQUIVOS NO DIRETÓRIO ===');
fs.readdir('.', (err, files) =>{
    if(err){
    console.error('Erro ao ler diretório', err);
    return;
    }
    files.forEach(file =>{
        console.log('🗂️', file);
        
    });
})





