import { log } from "console";
import express from "express";
const app = express();
const port = 3000;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const prd =  [{
        produto : "Pneu" ,
        codigo : "CTYCY3",
        preco : "R$299,90"
        
    }]
//Rota com send (texto simples)
app.get('/texto', (req, res) => {
    res.send("Resposta em texto simples");
});

//Rota com json
app.get('/json', (req, res) =>{
    res.json({mensagem: 'Resposta em JSON', tempo: Date.now()})
});

//Rota com status + json
app.post('/criar', (req, res) =>{
    res.status(201). json({sucesso: true, mensagem: 'Recurso Criado!'});
});

//Rota com err
app.get('/erro', (req, res) =>{
    res.status(400).json({erro: 'Requisção inválida!'});
});
//Rota de redirecionamento
app.get('/redirect', (req, res) =>{
    res.redirect('/json');
});

//Rota sem conteúdo
app.get('/no-content', (req, res) =>{
    res.sendStatus(204);
});
app.get('/produto', (req, res) =>{
    res.status(200).json(prd);
});
app.get('/download', (req, res) =>{
    const caminho = path.join(__dirname, "texto.txt");
    res.download(caminho, "arquivo-exemplo.txt", (err) =>{
        console.error("Erro ao enviar o arquivo:", err);
        res.status(500).send("erro ao fazer o download!")
        
    })
})




app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
    
})