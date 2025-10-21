import { livros } from "../data/banco.js";

export default class LivroModel{
    static listar(){
        return livros;
    }
    static buscarPorId(id){
        return livros.find(l => l.id === Number (id));
    }
    static buscarPorCategoria(categoriaId){
        return livros.filter(l => l.categoriaId === Number(categoriaId));
    }
    static buscarPorAno(anoPublicacao){
        return livros.filter(l => l.anoPublicacao() ===  Number(anoPublicacao))
    }
    static buscarPorAutor(autorId){
        return livros.filter(l => l.autorId.toLowerCase() === autorId.toLowerCase())
    }
    static criar(livro){
        livros.push(livro);
        return livro;
    }
    static atualizar(id, dados){
        const index = livros.findIndex(a => a.id === Number(id));
        if(index === -1){
            return null;
        }
        livros[index] = {...livros[index], ...dados};
        return livros[index];
    }
    static deletar(id){
        const index = livros.findIndex(l => l.id === Number(id));
        if(index === -1){
            return false;
        }
        livros.splice(index, 1);
        return true
    }
}