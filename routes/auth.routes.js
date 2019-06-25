const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authcontroller = require('../controllers/auth.controller');

router.post('/register', authcontroller.register);
router.post('/authenticate', authcontroller.authenticate);
router.put('/profile/:id', secure.isAuthenticated, authcontroller.editProfile)
router.get('/profile/:id', secure.isAuthenticated, authcontroller.getProfile)
router.get('/logout', secure.isAuthenticated, authcontroller.logout)


module.exports = router;

