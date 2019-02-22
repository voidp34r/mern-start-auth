import Empresa from '../models/empresa';
// import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function getSomething(req, res) {
  const response = { response: 'bang!!1' };
  return res.status(200).send(response);
}

/**
 * Get all Empreas
 * @param req
 * @param res
 * @returns void
 */
export function getEmpresas(req, res) {
  Empresa.find().sort('-dateAdded').exec((err, empresas) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ empresas });
  });
}

/**
 * Save/update a empresa
 * @param req
 * @param res
 * @returns void
 */
export async function updateEmpresa(req, res) {
  await Empresa.collection
  .findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        id: req.body.id,
        name: req.body.name,
        sensorData: req.body.sensorData,
        datatime: req.body.datatime,
      },
    },
    { upsert: true }
  )
  .then((result) => {
    res.status(201).send({ result: { msg: `Updated : ${result}`, json: result } });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

 /**
 * Add a empresa
 * @param req
 * @param res
 * @returns void
 */
export async function addEmpresa(req, res) {
  if (!req.body.id || !req.body.name || !req.body.sensorData) {
    res.status(403).json({ error: 'falta algo não?', request: req.body });
  }

  const newEmpresa = new Empresa(req.body);
  let error = false;

  // Let's sanitize inputs
  newEmpresa.id = sanitizeHtml(newEmpresa.id);
  newEmpresa.name = sanitizeHtml(newEmpresa.name);
  newEmpresa.sensorData = req.body.sensorData.map((item) => { return item; });
  async function insertEmpresa(empresa) {
    return Empresa.collection
    .insertOne(empresa)
    .then(async (result) => {
      return result;
    })
    .catch((err) => {
      error = true;
      return err;
    });
  }
  async function findEmpresa(empresa) {
    return Empresa.findOne({ _id: empresa._id })
    .sort('-dateAdded')
    .then(async (resEmpresa) => {
      return resEmpresa;
    })
    .catch((err) => {
      return err;
    });
  }

  const resInsert = await insertEmpresa(newEmpresa);
  const resFind = await findEmpresa(newEmpresa);
  if (error) {
    res.status(500).json(resInsert);
  } else {
    res.status(200).json(resFind);
  }
}

/**
 * Get a single empresa
 * @param req
 * @param res
 * @returns void
 */
export function getEmpresa(req, res) {
  Empresa.findOne({ _id: req.params.cuid }).exec((err, empresa) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ empresa });
  });
}


/**
 * Delete a empresa
 * @param req
 * @param res
 * @returns void
 */
export async function deleteEmpresa(req, res) {
  await Empresa.findByIdAndDelete({ _id: req.params.cuid })
  .then(async (result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

/**
 * Get a single sensor list
 * @param req
 * @param res
 * @returns void
 */
export function getSensors(req, res) {
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
 * Post a single sensor
 * @param req
 * @param res
 * @returns void
 */
export async function postSensor(req, res) {
  const newSensor = req.body;
  let sensorSave = [];
  let error = false;

  // Let's sanitize inputs

  async function insertSensor(sensor, empresa) {
    return Empresa.collection
    .findOneAndUpdate({ _id: empresa._id }, { $set: { sensorData: sensor } })
    .then(async (result) => {
      return result;
    })
    .catch((err) => {
      error = true;
      return err;
    });
  }
  async function findEmpresa() {
    return Empresa.findOne({ _id: req.params.cuid })
    .sort('-dateAdded')
    .then(async (resEmpresa) => {
      return resEmpresa;
    })
    .catch((err) => {
      return err;
    });
  }

  const empresaCurrent = await findEmpresa();
  sensorSave = empresaCurrent.sensorData;
  sensorSave.push(newSensor);
  const resInsert = await insertSensor(sensorSave, empresaCurrent);
  if (error) {
    res.status(500).json(resInsert);
  } else {
    res.status(200).json(empresaCurrent);
  }
}

/**
 * Get a single sensor by sensoruid
 * @param req
 * @param res
 * @returns void
 */
export async function getSensorByUid(req, res) {
  let sensor = {};
  await Empresa.findOne({ _id: req.params.cuid }).exec((err, empresa) => {
    if (err) {
      res.status(500).send(err);
    }
    sensor = empresa.sensorData.map((sensorItem) => sensorItem).filter((sensorItem) => sensorItem.id === req.params.sensoruid);
    res.json({ sensor });
  });
}

/**
 * Get a single sensor data by sensoruid
 * @param req
 * @param res
 * @returns void
 */
export async function getDataSensorByUid(req, res) {
  let sensor = {};
  let data = {};
  await Empresa.findOne({ _id: req.params.cuid }).exec((err, empresa) => {
    if (err) {
      res.status(500).send(err);
    }
    sensor = empresa.sensorData.map((sensorItem) => sensorItem).filter((sensorItem) => sensorItem.id === req.params.sensoruid);
    data = sensor[0].data;
    res.json({ data });
  });
}

/**
 * Post a single sensor data by sensoruid
 * @param req
 * @param res
 * @returns void
 */
export async function postDataSensorByUid(req, res) {
  // const newSensor = req.body;
  // let sensorSave = [];
  let error = false;

  // Let's sanitize inputs

  async function insertSensorData(sensorList, empresa) {
    return Empresa.collection
    .findOneAndUpdate({ _id: empresa._id }, { $set: { sensorData: sensorList } })
    .then(async (result) => {
      return result;
    })
    .catch((err) => {
      error = true;
      return err;
    });
  }
  async function findEmpresa() {
    return Empresa.findOne({ _id: req.params.cuid })
    .sort('-dateAdded')
    .then(async (resEmpresa) => {
      return resEmpresa;
    })
    .catch((err) => {
      return err;
    });
  }

  // dataSave = empresaCurrent.sensorData.map((sensor) => sensor).filter((sensorItem) => sensorItem.id === req.params.sensoruid).map();
  // sensorSave.push(newSensor);
  const empresaCurrent = await findEmpresa();
  empresaCurrent.sensorData.forEach(el => {
    if (el.id === req.params.sensoruid) {
      el.data.push(req.body);
    }
  });
  // sensorSave = empresaCurrent.sensorData;
  // let sensorID = empresaCurrent.sensorData.map((sensor) => sensor).filter((sensorItem) => sensorItem.id === req.params.sensoruid);
  // sensorID.data.push(req.body);
  // sensorSave.push(newSensor);
  const resInsert = await insertSensorData(empresaCurrent.sensorData, empresaCurrent);
  if (error) {
    res.status(500).json(resInsert);
  } else {
    res.status(200).json(empresaCurrent);
  }
}

/**
 * Post a single sensor data by sensoruid and get params
 * @param req
 * @param res
 * @returns void
 * @param req.body.start // datatime start
 * @param req.body.end // datatime End
 */
export async function getSensorDataByParams(req, res) {
  const sensorList = [];
  const dataList = [];
  await Empresa.find({ _id: req.params.cuid })
  .then((result) => {
    if (result.length > 0) {
      if (result[0].sensor.length > 0) {
        result[0].sensor.map((sensor) => {
          if (sensor.id === req.params.sensoruid) {
            sensorList.push(sensor.data);
          }
          return sensor;
        });
        if (sensorList.length > 0) {
          sensorList.map((dataitem) => {
            dataitem.map((item) => {
              if (item.datatime.getTime() >= Date.parse(req.body.start) && item.datatime.getTime() <= Date.parse(req.body.end)) {
                dataList.push(item);
              }
            });
          });
          return res.status(200).send(dataList);
        } else {
          return res.status(404).send(`não há sensor com este id: ${req.params.sensoruid}`);
        }
      } else {
        res.status(404).send('não há sensores');
      }
    } else {
      res.status(404).send(`não há empresa com este id: ${req.params.cuid}`);
    }
  })
  .catch((error) => {
    res.status(500).send(`${error}`);
  });
}
