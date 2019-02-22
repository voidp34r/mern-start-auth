import { Router } from 'express';
import * as SensorController from '../controllers/Sensor.controller';

const router = new Router();

// Get test
router.route('/test').get(SensorController.getSomething);

// Get all Empresas
router.route('/:cuid').get(SensorController.getSensor);

// Get one Empresa by cuid
// router.route('/:cuid').get(SensorController.getEmpresa);

// Add a new Sensor
// router.route('/').post(SensorController.addEmpresa);

// Update a Empresa
// router.route('/').put(SensorController.updateEmpresa);

// Delete a Empresa by cuid
// router.route('/:cuid').delete(SensorController.deleteEmpresa);
export default router;
