const express = require('express')
const router = express();
const cors=require('cors')

router.use(cors())

const indexRouter = require('./routes/index')

router.use('/', indexRouter);
// router.use('/auth',authRouter);



module.exports = router;