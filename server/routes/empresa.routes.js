import { Router } from 'express';
import * as EmpresaController from '../controllers/empresa.controller';
const router = new Router();

// Get test
router.route('/test').get(EmpresaController.getSomething);

// Get all Empresas
router.route('/empresas').get(EmpresaController.getEmpresas);


export default router;
