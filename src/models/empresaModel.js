var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT id, nome, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}


module.exports = { listar };
