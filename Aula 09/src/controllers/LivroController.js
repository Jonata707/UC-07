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
            const anoPublicacao = req.params.ano;
            const livros = LivroModel.buscarPorAno(anoPublicacao);
            if(livros.lenght === 0){
                res.status(404).json({msg: "Ano de publicaçaõ não encontrado!"});
                return;
            }
            res.status(200).json({livros})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar livro", erro: error.message}) 
        }
    }
    static buscarPorPreco(req, res){
        try {
            const preco = req.params.preco;
            const livros = LivroModel.buscarPorPreco(preco);
            if(livros.lenght === 0){
                res.status(404).json({msg: "Preço não encontrado!"});
                return;
            }
            res.status(200).json({livros})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar livro", erro: error.message}) 
        }
    }
    static buscarPorAutor(req, res){
        try {
            const autorId = req.params.autor;
            const livros = LivroModel.buscarPorAutor(autorId);
            if(livros.lenght === 0){
                res.status(404).json({msg: "Ano de publicaçaõ não encontrado!"});
                return;
            }
            res.status(200).json({livros})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar livro", erro: error.message}) 
        }
    }
    
     static buscarPorCategoria(req, res){
        try {
            const id = req.params.id;
            const livros = LivroModel.buscarPorCategoria(id);
            if(livros.lenght === 0){
                res.status(404).json({msg: "Categoria não encontrado!"});
                return;
            }
            res.status(200).json({livros})
        } catch (error) {
           res.status(500).json({msg: "Erro ao buscar categoria", erro: error.message}) 
        }
    }
     static buscarPorNome(req, res){
            try {
                const nome = req.params.nome;
                const autores = LivroModel.buscarPorNome(nome);
                if(autores.lenght === 0){
                    res.status(404).json({msg: "Nenhum autor com esse nome!"});
                    return;
                }
                res.status(200).json({autores})
            } catch (error) {
               res.status(500).json({msg: "Erro ao buscar autor", erro: error.message}) 
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
    static buscarPorNomeAutor(req, res) {
    try {
        const nomeAutor = req.params.nomeAutor;
        const autores = AutorModel.buscarPorNome(nomeAutor);

        if (autores.length === 0) {
            return res.status(404).json({ msg: "Nenhum livro encontrado com esse autor" });
        }

        const autorMap = new Map(autores.map(autor => [autor.id, autor]));

        const livros = LivroModel.listar();
        const categorias = CategoriaModel.listar(); 
        const categoriaMap = new Map(categorias.map(cat => [cat.id, cat.nome]));

        const livrosAutores = livros
            .filter(livro => autorMap.has(livro.autorId))
            .map(livro => {
                const autor = autorMap.get(livro.autorId);
                const nomeCategoria = categoriaMap.get(livro.categoriaId) || "Categoria desconhecida";

                return {
                    titulo: livro.titulo,
                    autor: autor.nome,
                    nacionalidade: autor.nacionalidade,
                    categoria: nomeCategoria, 
                    preco: livro.preco,
                    anoPublicacao: livro.anoPublicacao
                };
            });

        return res.status(200).json(livrosAutores);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar o livro pelo autor", erro: error.message });
    }
}

static buscarPorNomeCategoria(req, res) {
    try {
        const nomeCategoria = req.params.nomeCategoria;
        const categorias = CategoriaModel.buscarPorNome(nomeCategoria);

        if (categorias.length === 0) {
            return res.status(404).json({ msg: "Nenhum livro encontrado com essa categoria" });
        }
        const autores = AutorModel.listar();
        const autorMap = new Map(autores.map(autor => [autor.id, autor]));

        const livros = LivroModel.listar();
        const categoriaMap = new Map(categorias.map(cat => [cat.id, cat.nome]));

        const livrosCategorias = livros
            .filter(livro => categoriaMap.has(livro.categoriaId))
            .map(livro => {
                const autor = autorMap.get(livro.autorId);
                const nomeCategoria = categoriaMap.get(livro.categoriaId) || "Categoria desconhecida";

                return {
                    titulo: livro.titulo,
                    autor: autor.nome,
                    nacionalidade: autor.nacionalidade,
                    categoria: nomeCategoria, 
                    preco: livro.preco,
                    anoPublicacao: livro.anoPublicacao
                };
            });

        return res.status(200).json(livrosCategorias);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar o livro pela categoria", erro: error.message });
    }
}

}