var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/ultimas/dados", function (req, res) {
    dashboardController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas/sensores", function (req, res) {
    dashboardController.buscarSensoresAtivos(req, res);
})

router.get("/ultimas/alertas", function (req, res) {
    dashboardController.buscarAlertas(req, res);
})

module.exports = router;