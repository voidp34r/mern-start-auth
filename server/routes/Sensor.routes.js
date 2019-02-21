import { Router } from 'express';
import * as SensorController from '../controllers/Sensor.controller';

const router = new Router();

// Get test
router.route('/test').get(SensorController.getSomething);

export default router;
