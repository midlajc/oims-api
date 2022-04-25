const express = require("express");
const router = express();

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const admissionRouter = require("./routes/admission");
const dataRouter = require("./routes/data");
const sponsorRouter = require("./routes/sponsor");

router.use("/", indexRouter);
router.use("/admin", adminRouter);
router.use("/admission", admissionRouter);
router.use("/data", dataRouter);
router.use("/sponsor", sponsorRouter);

module.exports = router;
