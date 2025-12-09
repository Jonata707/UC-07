import UsuarioModel from "../models/UsuarioModel.js";
import axios from "axios";

export default class UsuarioController{
    static listar(req, res){
        try {
            const usuarios = UsuarioModel.listar();
            if(usuarios.length === 0){
                res.status(200).json({msg: "Nenhum usuário cadastrado" })
            }
            if(!usuarios){
                res.status(400).json({msg: "Erro ao buscar ao listar os usuários"})
                return
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }

    //Buscar por id
    static BuscarPorId(req, res){
        try {
            const id = req.params.id
            const usuario = UsuarioModel.buscarPorId(id)
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static async criar(req, res){
        try {
            const {nome, cep, numero, telefone} = req.body;
            if(!nome || !cep || !numero || !telefone){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos!"});
                return;
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP Inválido!"});
                return;
            }
            const novoUsuaio = {
                id: Date.now(),
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,
                numero: numero,
                bairro: buscaCep.data.bairro,
                localidade: buscaCep.data.localidade,
                estado: buscaCep.data.estado
            }
            const userCriado = UsuarioModel.criar(novoUsuaio);
            res.status(201).json(userCriado)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static async atualizar(req, res){
        try {
            const id = req.params.id;
            const {nome, cep, numero, telefone} = req.body;
            if(!nome || !cep || !numero || !telefone){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos!"});
                return;
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP Inválido!"});
                return;
            }
            const dadosAtualizados = {
                id: Date.now(),
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,
                numero: numero,
                bairro: buscaCep.data.bairro,
                cidade: buscaCep.data.cidade,
                estado: buscaCep.data.estado
            }
            const userAtualizado = UsuarioModel.atualizar(id, dadosAtualizados);
            if(!userAtualizado){
                res.status(404).json({msg: "Usuário não encontrado!"})
            }
            res.status(201).json({msg: "Usuário atualizado com sucesso!",userAtualizado})
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static delete(req, res){
        try {
            const id = req.params.id;
            const userDelete = UsuarioModel.deletar(id);
            if(!userDelete){
                res.status(404).json({msg: "Usuário não encontrado!"})
            }
            res.status(200).json({msg: "usuário excluído com sucesso!"})
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
     static BuscarPorLocalidade(req, res){
        try {
            const localidade = req.params.localidade
            const usuario = UsuarioModel.buscarPorLocalidade(localidade)
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
     static BuscarPorBairro(req, res){
        try {
            const bairro = req.params.bairro
            const usuario = UsuarioModel.buscarPorBairro(bairro)
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static BuscarPorEstado(req, res){
        try {
            const estado = req.params.estado
            const usuario = UsuarioModel.buscarPorEstado(estado)
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
     static OrdenarPorNome(req, res){
        try {
            const nome = req.params.nome;
            const usuarios = UsuarioModel.OrdenarPorNome(nome);
            if(usuarios.length === 0){
                res.status(200).json({msg: "Nenhum usuário cadastrado" })
            }
           
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static BuscarPorCep(req, res){
        try {
            const cep = req.params.cep
            const usuario = UsuarioModel.buscarPorCep(cep)
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static estatisticas(req, res){
        try {
            const estatistica = UsuarioModel.estatisticas();

            if(!estatistica){
                res.status(400).json({msg: "Erro ao listar estatísticas."})
            }
            res.status(200).json(estatistica)
        } catch (error) {
             res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }


}