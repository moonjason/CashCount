const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('dash/dashboard') // with the sessions current shit 
})

module.exports = router;