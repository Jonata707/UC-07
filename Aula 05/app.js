import express from "express";
const app = new express();
const port = 3000;

//Middleware para interpretar JSON no corpo na requisição
app.use(express.json());
//Vetor que simula um banco de dados

let produtos = [
  {
    id: 1, nome: "Arroz", preco: 10.5
  },
  {
    id: 2, nome: "Feijão", preco: 8.5
  },

];

app.get('/', (req, res) =>{
    res.status(200).send("Hello World");
});


//READ - Listar toods o produtos
app.get('/produtos', (req, res) =>{
res.status(200).json(produtos);
});

//READ - Buscar produto por ID
app.get('/produtos/:id', (req, res) =>{ 
    try {
        const id = parseInt(req.params.id);
        const produto = produtos.find(p => p.id === id);
        if(!produto){
            res.status(404).json({msg: "Produto não encontrado"});
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
})

    // CREATE - Adicionar um novo produto
    app.post('/produtos', (req, res) =>{
        try {
            const {nome, preco} = req.body;
            //Validação simples
            if(!nome || !preco){
                res.status(400).json({msg: "Nome e Preço são obrigatórios!"});
            }
            const novoProduto = {
                id: produtos.length + 1,
                nome: nome,
                preco: Number(preco)
            }
            produtos.push(novoProduto);
            res.status(201).json({msg: "Produto criado com sucesso!", novoProduto})
        } catch (error) {
            res.status(500).json({erro: error.message});
        };
    });

    //DELETE - Remover porduto por ID
    app.delete('/produtos/:id', (req, res) =>{
        try {
            const id = parseInt(req.params.id);
            const index = produtos.findIndex(p => p.id === id);
            const removido = produtos.splice(index, 1);
            res.status(200).json({msg: "Produto Removido com sucesso", removido});
            if(index === -1){
                res.status(404).jspon({msg: "Produto nao encontrado."});
            }
        } catch (error) {
            
        }
    });

    //UPDATE - Rota para atualizar um produto por ID

    app.put('/produtos/:id', (req, res) =>{
        try {
            const id = parseInt(req.params.id);
        const {nome, preco} = req.body;
        const produto = produtos.find(p => p.id === id)
        if(!produto){
            res.status(404).json({msg: "Produto não encontrado"})
        }
        //Atualiza apenas se vierem novos valores
        if(nome)  produto.nome = nome;
        if(preco) produto.preco = Number(preco);
        res.json({msg: "Produto atualizado com sucesso!", produto})
        } catch (error) {
            res.status(500).json({erro: error.message});
        }
        

    })

app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
});