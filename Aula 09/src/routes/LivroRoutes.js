import express from "express";
import LivroController from "../controllers/LivroController.js";
const router = express.Router();

router.get("/", LivroController.listar);
router.post("/", LivroController.criar);
router.get("/:id", LivroController.buscarPorId);
router.get("/ano/:ano", LivroController.buscarPorAno);
router.get("/autor/:id", LivroController.buscarPorAutor);
router.get("/preco/:preco", LivroController.buscarPorPreco)
router.get("/categoria/:id", LivroController.buscarPorCategoria);
router.get("/autor/nome/:nomeAutor", LivroController.buscarPorNomeAutor);
router.get("/categoria/nome/:nomeCategoria", LivroController.buscarPorNomeCategoria);


export default router;