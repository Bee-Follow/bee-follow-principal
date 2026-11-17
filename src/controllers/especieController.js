var especieModel = require("../models/especieModel");

// Normaliza o nome para verificação de duplicidade
function normalizarNome(nome) {
  if (!nome) return "";
  // remover acentos
  var mapaAcentos = { 'á':'a','à':'a','ã':'a','â':'a','ä':'a','Á':'A','À':'A','Ã':'A','Â':'A','Ä':'A', 'é':'e','è':'e','ê':'e','ë':'e','É':'E','È':'E','Ê':'E','Ë':'E', 'í':'i','ì':'i','î':'i','ï':'i','Í':'I','Ì':'I','Î':'I','Ï':'I', 'ó':'o','ò':'o','õ':'o','ô':'o','ö':'o','Ó':'O','Ò':'O','Õ':'O','Ô':'O','Ö':'O', 'ú':'u','ù':'u','û':'u','ü':'u','Ú':'U','Ù':'U','Û':'U','Ü':'U', 'ç':'c','Ç':'C' };
  var resultado = '';
  for (var i = 0; i < nome.length; i++) {
    var c = nome[i];
    resultado += mapaAcentos[c] || c;
  }
  // lowercase, substitui não alfanum por hífen, remove múltiplos hífens
  resultado = resultado.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').replace(/-+/g, '-');
  return resultado;
}

function cadastrar(req, res) {
  var nome = req.body.nome;
  var tipo_aquario = req.body.tipo_aquario;
  var caracteristicas = req.body.caracteristicas || '';
  var fk_aquario = req.body.fk_aquario || null;
  var fk_empresa = req.body.fk_empresa || req.body.empresaId; // aceitar ambos

  if (nome == undefined || nome.trim() === '') {
    res.status(400).send('nome está undefined!');
    return;
  }
  if (tipo_aquario == undefined) {
    res.status(400).send('tipo_aquario está undefined!');
    return;
  }
  if (fk_empresa == undefined) {
    res.status(400).send('fk_empresa está undefined!');
    return;
  }

  var nome_normalizado = normalizarNome(nome);

  especieModel.existePorNomeNormalizado(fk_empresa, nome_normalizado)
    .then(function (resultado) {
      if (resultado && resultado.length > 0) {
        res.status(409).send('Espécie duplicada para esta empresa');
      } else {
        especieModel.cadastrar(nome, nome_normalizado, tipo_aquario, caracteristicas, fk_aquario, fk_empresa)
          .then(function (resultadoInsercao) {
            res.status(201).json(resultadoInsercao);
          }).catch(function (erro) {
            console.log("Houve um erro ao cadastrar espécie: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
      }
    }).catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
  var idEspecie = req.params.idEspecie;
  var nome = req.body.nome;
  var tipo_aquario = req.body.tipo_aquario;
  var caracteristicas = req.body.caracteristicas || '';
  var fk_aquario = req.body.fk_aquario || null;
  var fk_empresa = req.body.fk_empresa || req.body.empresaId;

  if (idEspecie == undefined) {
    res.status(400).send('idEspecie está undefined!');
    return;
  }
  if (nome == undefined || nome.trim() === '') {
    res.status(400).send('nome está undefined!');
    return;
  }
  if (tipo_aquario == undefined) {
    res.status(400).send('tipo_aquario está undefined!');
    return;
  }
  if (fk_empresa == undefined) {
    res.status(400).send('fk_empresa está undefined!');
    return;
  }

  var nome_normalizado = normalizarNome(nome);

  // verificar se outra espécie com o mesmo nome_normalizado existe (diferente do id atual)
  especieModel.existePorNomeNormalizado(fk_empresa, nome_normalizado)
    .then(function (resultado) {
      if (resultado && resultado.length > 0) {
        // existe registro com mesmo nome_normalizado; permitir se for o próprio registro
        var existente = resultado[0];
        if (existente.id && parseInt(existente.id) !== parseInt(idEspecie)) {
          res.status(409).send('Espécie duplicada para esta empresa');
          return;
        }
      }

      especieModel.editar(idEspecie, nome, nome_normalizado, tipo_aquario, caracteristicas, fk_aquario)
        .then(function (resultadoEdicao) {
          res.status(200).json(resultadoEdicao);
        }).catch(function (erro) {
          console.log("Houve um erro ao editar espécie: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }).catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
  var idEspecie = req.params.idEspecie;
  if (idEspecie == undefined) {
    res.status(400).send('idEspecie está undefined!');
    return;
  }
  especieModel.deletar(idEspecie).then(function (resultado) {
    res.status(200).json(resultado);
  }).catch(function (erro) {
    console.log("Houve um erro ao deletar espécie: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listar(req, res) {
  // aceitar empresaId via query ou body
  var empresaId = req.query.empresaId || req.body.fk_empresa || req.body.empresaId;
  var q = req.query.q || req.body.q;
  var tipo = req.query.tipo || req.body.tipo;
  var fk_aquario = req.query.fk_aquario || req.body.fk_aquario;
  var limit = req.query.limit || req.body.limit;
  var offset = req.query.offset || req.body.offset;

  if (empresaId == undefined) {
    res.status(400).send('empresaId está undefined!');
    return;
  }

  especieModel.buscarComFiltros({ empresaId: empresaId, q: q, tipo: tipo, fk_aquario: fk_aquario, limit: limit, offset: offset })
    .then(function (resultado) {
      // A model retorna múltiplos conjuntos quando usamos SQL_CALC_FOUND_ROWS; database.executar pode devolver um array com dois resultados
      res.status(200).json(resultado);
    }).catch(function (erro) {
      console.log("Houve um erro ao listar espécies: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorId(req, res) {
  var idEspecie = req.params.id;
  if (idEspecie == undefined) {
    res.status(400).send('id está undefined!');
    return;
  }
  especieModel.buscarPorId(idEspecie).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado[0]);
    } else {
      res.status(404).send('Espécie não encontrada');
    }
  }).catch(function (erro) {
    console.log("Houve um erro ao buscar espécie: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  cadastrar,
  editar,
  deletar,
  listar,
  buscarPorId
};
