import jwt from "jsonwebtoken";

//Função middleware oara proteger rotas
export function autenticarToken(req, res, next){
  //pegar o header Autorization (formato esperando: "Bearer <token>")
  const autHeader = req.headers["authorization"];
    //Extrair token do header(remove o "Bearer")
    const token = autHeader && autHeader.split(" ")[1];
    //Se não houver token, retorna o erro 401 (não autorizado)

if(!token){
    res.status(401).json({msg: "Token não fornecido."});
    return;
}
try {
    //Verificar se o token é inválido
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    //adiciona os dados do usuário á requisição
    req.usuario = usuario;
    //continua para a proxima funçao da rota
    next()
} catch (error) {
    //Se o token for inválido ou experido, retorna erro 403(proibido)
    res.status(403).json({msg: "Erro interno", erro: "Token inválido ou experido!"})
}
}