import {livros} from "../models/livroModel.js";

export default class LivroController {
    static listar(req, res){
        res.status(200).json(livros);
    }

    static criar(req,res){
        try {
            const {titulo, autor, ano } = req.body;
            if(!titulo || !autor || !ano){
                res.status(400).json({msg: "Preencha todos os campos."});
            }
            const livro = livros.findIndex(f => f.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase());
            if(livro !== -1){
                 res.status(400).json({msg: "Título já existente."});
                 return;
            }
            if(Number(ano) <=1800 || Number(ano) > new Date().getFullYear()){
                 res.status(400).json({msg: "Ano Inválido"});
                 return;
            }
            const novoLivro = {
                id: livros.length + 1,
                titulo: titulo,
                autor: autor,
                ano: Number(ano)
            }
            livros.push(novoLivro);
            res.status(201).json({msg:"Livro adicionado com sucesso!", livro:novoLivro})
        } catch (error) {
             res.status(400).json({msg: "Erro ao criar o livro!", errp: error.message});
        }
    }
    
    static listarPorId(req, res){
        try {
            const id = parseInt(req.params.id);
            const livro = livros.find(l => l.id === id);
            if(!livro){
                res.status(400).json({msg: "Livro não encontrado!"})
                return;
            }
            res.status(200).json(livro);
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar livro", erro: error.message})
        }
    }

    static atualizar(req, res){
        try {
            const id = parseInt(req.params.id);
            const {titulo, autor, ano} = req.body;
            const livro = livros.find(l => l.id === id);
            if(!livro){
                res.status(400).json({msg:"Livro não encontrado."});
                return;
            }
            if(!titulo || !autor || !ano){
                res.status(400).json({msg: "Preencha todos os campos."})
            }
             if(livros.findIndex(f => f.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase())
                !== -1){
                res.status(400).json({msg: "Título já existente. "});
                console.log(livro.titulo);
                
                return;
             }
               if(Number(ano) <=1800 || Number(ano) > new Date().getFullYear()){
                 res.status(400).json({msg: "Ano Inválido"});
                 return;
            }
            
                livro.titulo = titulo;
                livro.autor = autor;
                livro.ano = Number(ano)
                res.status(200).json({msg: "Livro Atualizado com sucesso!", livro: livro})
            
               
            
         
        } catch (error) {
            res.status(500).json({msg: "Erro ao atualizar livro", erro: error.message})
        }

        
    }

    static deletar (req, res){
        try {
            const id = parseInt(req.params.id);
            const index = livros.findIndex(l => l.id === id);
            if(index === -1){
                res.status(400).json({msg: "Livro não encontrado."});
                return;
            }
            livros.splice(index, 1);
            res.status(200).json({msg: "Livro removido com sucesso."})
        } catch (error) {
            res.status(500).json({msg: "Erro ao deletar o livro", erro: error.message})
        }
    }

    static buscarPorAutor(req, res){
        try {
            const autor = req.params.autor.toLowerCase();
            const livrosEncontrados = livros.filter(l => l.autor.toLowerCase().includes(autor));
            if(livrosEncontrados.length === 0){
                res.status(404).json({msg:"Nenhum livro encontrado para este autor."})
            }
            res.status(200).json(livrosEncontrados);
        } catch (error) {
            res.status(500).json({msg:"Erro ao buscar livro por autor.", erro: error.message})
        }
    }
}