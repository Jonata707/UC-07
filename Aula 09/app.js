import express from "express";
import 'dotenv/config'
import autorRoutes from "./src/routes/AutorRoutes.js"
import categoriasRoutes from "./src/routes/CategoriaRoutes.js"
import livrosRoutes from "./src/routes/LivroRoutes.js"
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/autores", autorRoutes)
app.use("/categorias", categoriasRoutes)
app.use("/livros", livrosRoutes)

app.get("/", (req, res) =>{
    res.status(200).json({msg: "API de Livros."})
})

app.listen(port, ()=>{
    console.log(`Servidor rodando em : http://localhost:${port}`);
})
