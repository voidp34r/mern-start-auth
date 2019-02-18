import Empresa from '../models/empresa';

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
