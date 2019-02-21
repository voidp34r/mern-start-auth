import { Router } from 'express';
import * as EmpresaController from '../controllers/empresa.controller';
const router = new Router();

// Get test
router.route('/test').get(EmpresaController.getSomething);

// Get all Empresas
router.route('/empresas').get(EmpresaController.getEmpresas);

// Get one Empresa by cuid
router.route('/empresas/:cuid').get(EmpresaController.getEmpresa);

// Add a new Empresa
router.route('/empresas').post(EmpresaController.addEmpresa);

// Update a Empresa
router.route('/empresas').put(EmpresaController.updateEmpresa);

// Delete a Empresa by cuid
router.route('/empresas/:cuid').delete(EmpresaController.deleteEmpresa);

export default router;
