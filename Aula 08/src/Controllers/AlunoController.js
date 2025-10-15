import { lista } from "../Models/AlunoModel.js";

export default class AlunoController{
    static listar(req, res){
            res.status(200).json(lista);
    }
    static buscar(req, res){
        try {
                    const id = parseInt(req.params.id);
                    const aluno = lista.find(l => l.id === id);
                    if(!aluno){
                        res.status(400).json({msg: "Aluno não encontrado!"})
                        return;
                    }
                    res.status(200).json(aluno);
                } catch (error) {
                    res.status(500).json({msg: "Erro ao buscar aluno", erro: error.message})
                }
    }
    static criar(req, res){
        const {nome, idade, curso, matricula} = req.body;
                  if(!nome || !idade || !curso || !matricula){
                      res.status(400).json({msg: "Preencha todos os campos."});
                  }
                  const aluno = lista.findIndex(f => f.nome.toLocaleLowerCase() === nome.toLocaleLowerCase());
                  if(aluno !== -1){
                       res.status(400).json({msg: "Aluno já existente."});
                       return;
                  }
                  if(Number(idade) < 16){
                       res.status(400).json({msg: "Ano Inválido."});
                       return;
                  }
                  if(lista.findIndex(f => f.matricula.toLocaleLowerCase() === matricula.toLocaleLowerCase()) !== -1){
                    res.status(400).json({msg:"Matrícula Inválida."})
                  }
                  const novoAluno = {
                      id: lista.length + 1,
                      nome: nome,
                      idade: Number(idade),
                      curso: curso,
                      matricula: matricula
                  }
                  lista.push(novoAluno);
                  res.status(201).json({msg:"Aluno adicionado com sucesso!", aluno: novoAluno})
              } catch (error) {
                   res.status(400).json({msg: "Erro ao criar o aluno!", erro: error.message});
              }

    static atualizar(req, res){
        try {
            const id = parseInt(req.params.id);
            const {nome, idade, curso, matricula} = req.body;
            const aluno = lista.find(l => l.id === id);
            if(!aluno){
                res.status(400).json({msg:"Aluno não encontrado."});
                return;
            }
            if(!nome || !idade || !curso || !matricula){
                res.status(400).json({msg: "Preencha todos os campos."})
            }
             if(lista.findIndex(f => f.nome.toLocaleLowerCase() === nome.toLocaleLowerCase())
                !== -1){
                res.status(400).json({msg: "Nome já existente. "});
                console.log(aluno.nome);
                
                return;
             }
               if(Number(idade) < 16){
                 res.status(400).json({msg: "Ano Inválido"});
                 return;
            }
            if(lista.findIndex(f => f.matricula.toLocaleLowerCase() === matricula.toLocaleLowerCase()) !== -1){
                 res.status(400).json({msg: "Matrícula já existente"})
            }
            
                aluno.nome = nome;
                aluno.idade = Number(idade);
                aluno.curso = curso;
                aluno.matricula = matricula
                res.status(200).json({msg: "Aluno Atualizado com sucesso!", aluno: aluno})
            
               
            
         
        } catch (error) {
            res.status(500).json({msg: "Erro ao atualizar aluno", erro: error.message})
        }
              }
              static deletar(req, res){
                try {
                            const id = parseInt(req.params.id);
                            const aluno = lista.findIndex(l => l.id === id);
                            if(aluno === -1){
                                res.status(400).json({msg: "aluno não encontrado."});
                                return;
                            }
                            lista.splice(aluno, 1);
                            res.status(200).json({msg: "Aluno removido com sucesso."})
                        } catch (error) {
                            res.status(500).json({msg: "Erro ao deletar o aluno.", erro: error.message})
                        }
                    }
                    static BuscarPorCurso(req, res){
                        try {
                                    const curso = req.params.curso.toLowerCase();
                                    const alunosEncontrados = lista.filter(l => l.curso.toLowerCase().includes(curso));
                                    if(alunosEncontrados.length === 0){
                                        res.status(404).json({msg:"Nenhum aluno encontrado que faça este curso."})
                                    }
                                    res.status(200).json(alunosEncontrados);
                                } catch (error) {
                                    res.status(500).json({msg:"Erro ao buscar aluno por curso.", erro: error.message})
                                }
                    }
              }
    
