var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/ultimas/dados/:idApiario", function (req, res) {
    dashboardController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas/sensores/:idApiario", function (req, res) {
    dashboardController.buscarSensoresAtivos(req, res);
})

router.get("/ultimas/alertas/:idApiario", function (req, res) {
    dashboardController.buscarAlertas(req, res);
})

module.exports = router;