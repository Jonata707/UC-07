import express from "express";
import LivroController from "../controllers/LivroController.js";
const router = express.Router();

router.get("/", LivroController.listar);
router.get("/:id", LivroController.buscarPorId);
router.get("/ano", LivroController.buscarPorAno);
router.post("/", LivroController.criar);
router.put("/:id", LivroController.atualizar);
router.delete("/:id", LivroController.deletar);


export default router;