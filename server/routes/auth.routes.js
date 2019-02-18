import { Router } from 'express';
const authController = require('../controllers/auth.controller');
const router = new Router();

router.get('/:username', (req, res) => {
  authController.login(req.body.username, req.body.password, (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        success: 0,
        error: err,
      });
      return;
    }

    if (result) {
      res.status(200).json({
        success: 1,
        data: {
          tokenID: result,
          username: req.body.username,
        },
      });
    } else {
      res.status(401).json({
        success: 0,
        data: result,
      });
    }
  });
});

router.post('/:username', (req, res) => {
  authController.login(req.body.username, req.body.password, (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        success: 0,
        error: err,
      });
      return;
    }

    if (result) {
      res.status(200).json({
        success: 1,
        data: {
          tokenID: result,
          username: req.body.username,
        },
      });
    } else {
      res.status(401).json({
        success: 0,
        data: result,
      });
    }
  });
});

router.post('/', (req, res) => {
  authController.register(req.body.username, req.body.password, (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        success: 0,
        error: err,
      });
      return;
    }
    if (result) {
      res.status(200).json({
        success: 1,
        data: {
          tokenID: result,
          username: req.body.username,
        },
      });
    } else {
      res.status(401).json({
        success: 0,
        data: result,
      });
    }
  });
});

module.exports = router;
