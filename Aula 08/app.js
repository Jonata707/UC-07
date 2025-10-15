import express from "express";
import AlunoRouter from "./src/Routes/AlunoRoutes.js"
import 'dotenv/config'
const port = process.env.PORT;
const app = express();


app.use(express.json()); //Configuração do mediador

app.use('/alunos', AlunoRouter );
app.get('/', (req, res) =>{
    res.status(200).send(process.env.SAUDACAO);
});

app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
    
});