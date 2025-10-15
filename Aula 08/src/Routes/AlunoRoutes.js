import express from 'express';
import AlunoController from '../Controllers/AlunoController.js';
const router = express.Router();

router.get('/', AlunoController.listar);
router.get('/:id', AlunoController.buscar);
router.post('/', AlunoController.criar);
router.put('/:id', AlunoController.atualizar);
router.delete('/:id', AlunoController.deletar);
router.get('/curso/:curso', AlunoController.BuscarPorCurso);
export default router;
