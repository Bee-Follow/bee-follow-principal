var express = require("express");
var router = express.Router();

var especieController = require("../controllers/especieController");

router.get("/", function (req, res) {
  especieController.listar(req, res);
});

router.get("/:id", function (req, res) {
  especieController.buscarPorId(req, res);
});

router.post("/cadastrar", function (req, res) {
  especieController.cadastrar(req, res);
});

router.put("/editar/:idEspecie", function (req, res) {
  especieController.editar(req, res);
});

router.delete("/deletar/:idEspecie", function (req, res) {
  especieController.deletar(req, res);
});

module.exports = router;
