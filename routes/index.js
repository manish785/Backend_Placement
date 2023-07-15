const express = require('express');
const router = express.Router();


// user routes
router.use('/users', require('./users'));
// student routes
router.use('/student', require('./students'));
// interview routes
router.use('/interview', require('./interview'));



module.exports = router;




// console.log('router loaded');



// router.use('/users', require('./users'));
// router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments'));
// router.use('/likes', require('./likes'));


// router.use('/api', require('./api'));
// // for any further routes, access from here
// // router.use('/routerName', require('./routerfile));


// module.exports = router;