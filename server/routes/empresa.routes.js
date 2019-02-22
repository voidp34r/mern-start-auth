import { Router } from 'express';
import * as EmpresaController from '../controllers/empresa.controller';
const router = new Router();

// Get test
router.route('/test').get(EmpresaController.getSomething);

// Get all Empresas
router.route('/').get(EmpresaController.getEmpresas);

// Get one Empresa by cuid
router.route('/:cuid').get(EmpresaController.getEmpresa);

// Add a new Empresa
router.route('/').post(EmpresaController.addEmpresa);

// Update a Empresa
router.route('/').put(EmpresaController.updateEmpresa);

// Delete a Empresa by cuid
router.route('/:cuid').delete(EmpresaController.deleteEmpresa);

// Get one Sensor List by cuid
router.route('/:cuid/sensor').get(EmpresaController.getSensors);

// Get one Sensor List by cuid
router.route('/:cuid/add').post(EmpresaController.postSensor);

// Get one Sensor  by sensoruid
router.route('/:cuid/sensor/:sensoruid').get(EmpresaController.getSensorByUid);

// Get data list form Sensor by sensoruid
router.route('/:cuid/sensor/:sensoruid/data').get(EmpresaController.getDataSensorByUid);

// Post data list to Sensor by sensoruid
router.route('/:cuid/sensor/:sensoruid/data').post(EmpresaController.postDataSensorByUid);

// get data from Sensor by sensoruid and params
router.route('/:cuid/sensor/:sensoruid/params').post(EmpresaController.getSensorDataByParams);
export default router;
