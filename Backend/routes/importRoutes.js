const express = require("express");
const router = express.Router();

const { importCSV } = require("../controllers/importController");

router.post("/import", importCSV);

module.exports = router;