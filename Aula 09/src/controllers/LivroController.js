import AutorModel from "../models/AutorModel.js";
import LivroModel from "../models/LivroModel.js";
import CategoriaModel from "../models/CategoriaModel.js";

export default class LivroController{
    static listar(req, res){
        try {
            const livros = LivroModel.listar();
            if(!livros){
                res.status(400).json({msg: "Erro ao listar os livros."});
                return;
            }
            
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({msg: "erro interno", erro: error.message})
        }
    }
    static buscarPorId(req, res){
        try {
            const id = req.params.id;
            const livro = LivroModel.buscarPorId(id);
            if(!livro){
                res.status(404).json({msg: "Livro não encontrado!"});
                return;
            }
            res.status(200).json({livro})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar livro", erro: error.message}) 
        }
    }
    static buscarPorAno(req, res){
        try {
            const anoPublicacao = req.params.anoPublicacao;
            const livros = LivroModel.buscarPorAno(anoPublicacao);
            if(livros.lenght === 0){
                res.status(404).json({msg: "ANo de publicaçaõ não encontrado!"});
                return;
            }
            res.status(200).json({livros})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar livro", erro: error.message}) 
        }
    }
    static criar(req, res){
        try {
            const { titulo, autorId, categoriaId, anoPublicacao, preco } = req.body;
            if (!titulo || !autorId || !categoriaId || !anoPublicacao || !preco){
               res.status(400).json({msg: "Preencha todos os campos."});
               return;
            }
            if(!AutorModel.buscarPorId(autorId)){
                 res.status(400).json({msg: "Autor Inválido."});
                 return;
            }
            if(!CategoriaModel.buscarPorId(categoriaId)){
                 res.status(400).json({msg: "Categoria Inválido."});
                 return;
            }
            if (Number(anoPublicacao) <= 1880 || Number(anoPublicacao) < new Date().getFullYear){
                res.status(400).json({msg: "Ano Inválido."})
            }
            if (Number(preco) <=0){
                res.status(400).json({msg: "Preço deve ser maior que zero!"})
            }
            const livros = LivroModel.listar();
            const novo = {
                id: livros.length +1,
                titulo: titulo,
                autorId: autorId,
                categoriaId: categoriaId,
                anoPublicacao: anoPublicacao,
                preco: preco
                
                
            }
            LivroModel.criar(novo);
            res.status(201).json({msg: "livro Criado", livro: novo})
        } catch (error) {
                res.status(500).json({msg: "Erro ao tentar criar livro", erro: error.message}) 
        }
    }
    static atualizar(req, res){
        try {
            const id = req.params.id;
            const { titulo, autorId, livroId, anoPublicacao, preco} = req.body;
            if (!titulo || !autorId || !livroId || !anoPublicacao || !preco){
               res.status(400).json({msg: "Preencha todos os campos."});
               return;
            }
            
            const atualizado = LivroModel.atualizar(id, { titulo, autorId, livroId, anoPublicacao, preco }) 
                if(!atualizado){
                   res.status(404).json({msg: "livro não encontrado."})
                   return;
                }
            
            
            res.status(201).json({msg: "livro Atualizado com sucesso", livro: atualizado})
        } catch (error) {
                res.status(500).json({msg: "Erro ao tentar criar livro", erro: error.message}) 
        }
}
    static deletar(req, res){
        try {
            const id = req.params.id;
            const status = LivroModel.deletar(id);
            if(!status){
                res.status(404).json({msg: "livro não encontrado!"});
                return;
            }
            res.status(200).json({msg: "livro excluído."})
        } catch (error) {
            res.status(500).json({msg: "Erro ao tentar tentar apagar livro.", erro: error.message})
        }
    }
}