var express = require("express");
var router = express.Router();
var colmeiaController = require ("../controllers/colmeiaController");

// ------------------------------ KPI 1
router.get("/kpi1", function (req, res) {
    colmeiaController.kpi1(req, res);
})

// ------------------------------ KPI 2
router.get("/kpi2", function (req, res) {
    colmeiaController.kpi2(req, res);
})

// ------------------------------ KPI 4
router.get("/kpi4", function (req, res) { 
    colmeiaController.kpi4(req, res);
})


module.exports = router;