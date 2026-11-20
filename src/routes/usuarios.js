var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);

module.exports = router;

// Esse arquivo define as rotas de login e cadastro. 
// Cada rota configura a URL e o método HTTP, e indica 
// qual função do controller será executada quando essa 
// URL for acessada. A rota /cadastrar chama a função de 
// cadastro e a rota /autenticar chama a função de login.