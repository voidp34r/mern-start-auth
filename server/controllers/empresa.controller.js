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
