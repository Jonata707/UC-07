import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
const router = express.Router();


router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.BuscarPorId);
router.post("/", UsuarioController.criar);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.delete);
router.get("/localidade/:localidade", UsuarioController.BuscarPorLocalidade);
router.get("/estado/:estado", UsuarioController.BuscarPorEstado);
router.get("/ordenar/nome", UsuarioController.OrdenarPorNome);
router.get("/cep/:cep", UsuarioController.BuscarPorCep);
router.get("/bairro/:bairro", UsuarioController.BuscarPorBairro);
router.get("/estatisticas", UsuarioController.estatistica);

export default router;