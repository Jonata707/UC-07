import { usuarios } from "../data/banco.js";

export default class UsuarioModel{
    
    static listar(){
        return usuarios;
    }
    static buscarPorId(id){
        return usuarios.find(u => u.id === parseInt(id));
    }
    static criar(usuario){
        usuarios.push(usuario);
        return usuario;
    }
    static atualizar (id, novosDados){
        const index = usuarios.findIndex(u => u.id === parseInt(id));
        if(index === -1){
            return null;
        }
        usuarios[index] = {...usuarios[index], ...novosDados};
        return usuarios[index];
    }
    static deletar(id){
        const index = usuarios.findIndex(u => u.id === parseInt(id));
        if(index === -1){
            return false
        }
        usuarios.splice(index, 1);
        return true;
    }
    static buscarPorLocalidade(localidade){
        return usuarios.filter(u => u.localidade.toLowerCase() === localidade.toLowerCase());
    }
    static buscarPorBairro(bairro){
        return usuarios.filter(u => u.bairro.toLowerCase() === bairro.toLowerCase());
    }
    static buscarPorEstado(estado){
        return usuarios.filter(u => u.estado.toLowerCase() === estado.toLowerCase());
    }
    static OrdenarPorNome(){
         return usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
    }
    static buscarPorCep(cep){
        return usuarios.filter(u => u.cep.toLowerCase() === cep);
    }
    static estatisticas(){
        let cidades = [];
        let estados = [];

        usuarios.forEach(usuario => {
            if(! cidades.includes(usuario.cidade)) {cidades.push(usuario.cidade);}
            if(! estados.includes(usuario.estado)) {estados.push(usuario.estado);}
        });
        return {user: usuarios.length, cidades: cidades.length, estados: estados.length}
    }
}