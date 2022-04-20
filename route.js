const express = require("express");
const router = express();

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const admissionRouter = require("./routes/admission");

router.use("/", indexRouter);
router.use("/admin", adminRouter);
router.use('/admission',admissionRouter)

module.exports = router;
