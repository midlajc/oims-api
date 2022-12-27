const express = require("express");
const router = express();

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const admissionRouter = require("./routes/admission");
const dataRouter = require("./routes/data");
const sponsorRouter = require("./routes/sponsor");
const studentsRouter = require("./routes/students");
const sponsorshipsRouter = require("./routes/sponsorships");
const accountsRouter = require("./routes/accounts");

router.use("/admin", adminRouter);
router.use("/admission", admissionRouter);
router.use("/data", dataRouter);
router.use("/sponsor", sponsorRouter);
router.use("/students", studentsRouter);
router.use("/sponsorships", sponsorshipsRouter);
router.use("/accounts", accountsRouter);
router.use("/", indexRouter);

module.exports = router;
