import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;
let filmes =
[
    {
        id:1,
        titulo: "Kimetsu no Yaiba",
        diretor: "Haruo Sotozaki",
        anoLancamento: 2025,
        classificação: 18
    },
    {
        id:2,
        titulo: "Thunderbolts",
        diretor: "Jake Schreie",
        anoLancamento: 2025,
        classificação: 14
    },
    {   
        id:3,
        titulo: "Tropa de Elite",
        diretor: "José Padilha",
        anoLancamento: 2007,
        classificação: 16 
    },
       { id:3,
        titulo: "Tropa de Elite 5",
        diretor: "José Padilha",
        anoLancamento: 2007,
        classificação: 16 
       }
]
app.get('/filmes', (req, res)=>{
    res.status(200).json(filmes);
});
app.get('/filme/:id', (req, res) =>{
        try {
        const id = parseInt(req.params.id);
        const filme = filmes.find(p => p.id === id);
        if(!filme){
            res.status(404).json({msg: "Filme não encontrado"});
        }
        res.status(200).json(filme);
    } catch (error) {
        res.status(500).json({erro: error.message});
    }
});
app.post('/filmes', (req,res) =>{
        try {
            const {titulo, diretor, anoLancamento, classificacao} = req.body;
             const index = filmes.findIndex(p => p.titulo === titulo);
            
            //Validação simples
            if(!titulo || !diretor || !anoLancamento || !classificacao){
                res.status(400).json({msg: "Título, Diretor, Ano de Lançamento e Classificação são obrigatórios!"});
            }
            if(anoLancamento > 2025){
                   res.status(400).json({msg: "Ano de Lançamento não permitido"})
            }
            if(index !== -1){
                res.status(400).json({msg: "Títulos repetidos não permitido"})
            }
            const novoFilmes = {
                id: filmes.length + 1,
                titulo: titulo,
                diretor: diretor,
                anoLancamento: anoLancamento,
                classificacao: classificacao
            }
            
            filmes.push(novoFilmes);
            res.status(201).json({msg: "Filme criado com sucesso!", novoFilmes})
        } catch (error) {
            res.status(500).json({erro: error.message});
        };
});
app.put('/filmes/:id', (req, res) =>{
            try {
            const id = parseInt(req.params.id);
        const {titulo, diretor, anoLancamento, classificacao} = req.body;
        const filme = filmes.find(p => p.id === id)
        if(!filme){
            res.status(404).json({msg: "Filme não encontrado"})
        }
        //Atualiza apenas se vierem novos valores
        if(titulo)  filme.titulo = titulo;
        if(diretor) filme.diretor = diretor;
        if(anoLancamento) filme.anoLancamento = anoLancamento;
        if(classificacao) filme.classificação = classificacao;
        res.json({msg: "Filme atualizado com sucesso!", filme})
        } catch (error) {
            res.status(500).json({erro: error.message});
        }

});
app.delete('/filmes/:id', (req, res) =>{
    try {
            const id = parseInt(req.params.id);
            const index = filmes.findIndex(p => p.id === id);
            const removido = filmes.splice(index, 1);
            res.status(200).json({msg: "Filme Removido com sucesso", removido});
            if(index === -1){
                res.status(404).json({msg: "Filme nao encontrado."});
            }
        } catch (error) {
            
        }
});
app.get('/filmes/classificacao/:classificacao', (req, res) =>{
try {
    const classificacao = parseInt(req.params.classificacao);
    const filme =filmes.find(p => p.classificação === classificacao);
    if(!filme){

            res.status(404).json({msg: "Filme não encontrado"});
        }
        res.status(200).json(filme);
} catch (error) {
       res.status(500).json({erro: error.message});
}
})
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});
