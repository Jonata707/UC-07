import express from "express";
import AutorController from "../controllers/AutorController.js";
const router = express.Router();

router.get("/", AutorController.listar);
router.get("/:id", AutorController.buscarPorId);
router.get("/nacionalidade/:nacionalidade", AutorController.buscarPorNacionalidade);
router.post("/", AutorController.criar);
router.put("/:id", AutorController.atualizar);
router.delete("/:id", AutorController.deletar);


export default router;