var database = require("../database/config");

// Model para operações com a tabela `especie`
function cadastrar(nome, nome_normalizado, tipo_aquario, caracteristicas, fk_aquario, fk_empresa) {
  var instrucaoSql = `INSERT INTO especie (nome, nome_normalizado, tipo_aquario, caracteristicas, fk_aquario, fk_empresa) VALUES ('${nome}', '${nome_normalizado}', '${tipo_aquario}', '${caracteristicas}', ${fk_aquario || 'NULL'}, ${fk_empresa});`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editar(idEspecie, nome, nome_normalizado, tipo_aquario, caracteristicas, fk_aquario) {
  var instrucaoSql = `UPDATE especie SET nome='${nome}', nome_normalizado='${nome_normalizado}', tipo_aquario='${tipo_aquario}', caracteristicas='${caracteristicas}', fk_aquario=${fk_aquario || 'NULL'} WHERE id = ${idEspecie};`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(idEspecie) {
  var instrucaoSql = `DELETE FROM especie WHERE id = ${idEspecie};`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPorId(idEspecie) {
  var instrucaoSql = `SELECT e.*, a.descricao as aquario_descricao FROM especie e LEFT JOIN aquario a ON e.fk_aquario = a.id WHERE e.id = ${idEspecie};`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarComFiltros(params) {
  // params: { empresaId, q, tipo, fk_aquario, limit, offset }
  var empresaId = params.empresaId;
  var q = params.q;
  var tipo = params.tipo;
  var fk_aquario = params.fk_aquario;
  var limit = params.limit || 100;
  var offset = params.offset || 0;

  var where = `WHERE fk_empresa = ${empresaId}`;
  if (q) {
    where += ` AND (nome LIKE '%${q}%' OR caracteristicas LIKE '%${q}%')`;
  }
  if (tipo) {
    where += ` AND tipo_aquario = '${tipo}'`;
  }
  if (fk_aquario) {
    where += ` AND fk_aquario = ${fk_aquario}`;
  }

  var instrucaoSql = `SELECT e.*, a.descricao as aquario_descricao FROM especie e LEFT JOIN aquario a ON e.fk_aquario = a.id ${where} LIMIT ${limit} OFFSET ${offset};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function existePorNomeNormalizado(fk_empresa, nome_normalizado) {
  var instrucaoSql = `SELECT id FROM especie WHERE fk_empresa = ${fk_empresa} AND nome_normalizado = '${nome_normalizado}' LIMIT 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  editar,
  deletar,
  buscarPorId,
  buscarComFiltros,
  existePorNomeNormalizado
};
