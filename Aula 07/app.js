import express from "express";
import LivroRoutes from "./src/routes/livroRoutes.js";
const app = express();
const port = 3000;

app.use(express.json()); //Configuração do mediador

app.use('/livros', LivroRoutes);
app.get('/', (req, res) =>{
    res.status(200).send("Rota Home");
});

app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
    
});