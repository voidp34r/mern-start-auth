// import Sensor from '../models/Sensor';
import Empresa from '../models/empresa';


/**
 * Get all Empreas
 * @param req
 * @param res
 * @returns void
 */
export function getSomething(req, res) {
  return res.status(200).json(req);
}

/**
 * Get a single empresa
 * @param req
 * @param res
 * @returns void
 */
export function getSensor(req, res) {
  let sensor = {};
  Empresa.findOne({ _id: req.params.cuid }).exec((err, empresa) => {
    if (err) {
      res.status(500).send(err);
    }
    sensor = empresa.sensorData;
    res.json({ sensor });
  });
}


/**
 * Get a single empresa
 * @param req
 * @param res
 * @returns void
 */
export function getSensorByUid(req, res) {
  let sensor = {};
  Empresa.findOne({ _id: req.params.cuid }).exec((err, empresa) => {
    if (err) {
      // res.status(500).send(err);
    }
    sensor = empresa.sensorData.push({ id: 'adasdasd' });
    res.json({ sensor });

  });
}
