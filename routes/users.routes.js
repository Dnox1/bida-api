const express = require('express');
const router = express.Router();

const userscontroller = require('../controllers/users.controllers');


router.get('/:id', userscontroller.getProfile);

module.exports = router;