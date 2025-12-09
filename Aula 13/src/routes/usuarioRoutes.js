import UsuarioController from "../controllers/usuarioController.js";
import express from "express";
import { autenticarToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
//Rotas públicas
router.post("/login", UsuarioController.login);
router.post("/", UsuarioController.criar);


//Rota privada
router.get("/perfil/dados", autenticarToken, UsuarioController.perfil);
router.get("/", autenticarToken, UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.deletar);
router.patch("/:id", UsuarioController.atualizarParcialmente);


export default router;