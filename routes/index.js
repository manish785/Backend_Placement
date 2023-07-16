const express = require('express');
const router = express.Router();


// employee routes
router.use('/employee', require('./employee'));
// student routes
router.use('/student', require('./students'));
// interview routes
router.use('/interview', require('./interview'));



module.exports = router;



