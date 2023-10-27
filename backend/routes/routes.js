var express = require('express');

const router = express.Router();

var userController = require('../src/user/pollController');

router.route('/poll/getAll').get(userController.getDataConntrollerfn);

router.route('/poll/create').post(userController.createPollControllerFn);

module.exports = router;