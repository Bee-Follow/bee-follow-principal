var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var fk_empresa = req.body.fk_empresa;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fk_empresa == undefined) {
    res.status(400).send("Sua empresa a vincular está undefined!");
  } else {
    usuarioModel
      .cadastrar(nome, email, senha, fk_empresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function autenticar(req, res) {
  var email = req.body.email;
  var senha = req.body.senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json({
            id: resultadoAutenticar[0].id,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            fk_empresa: resultadoAutenticar[0].fk_empresa,
            fk_apiario: resultadoAutenticar[0].fk_apiario,
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
  autenticar,
};

// O controller recebe a requisição do front-end, extrai os dados do req.body
// e valida se os campos foram preenchidos. Na função cadastrar,
// também verifica se a senha tem pelo menos 8 caracteres e então chama o model
//  para inserir o funcionário no banco. Na função autenticar, chama o model para
//  buscar o usuário por email e senha: se não encontrar nenhum, retorna 403;
//  se encontrar um, devolve ao front-end seus dados (sem a senha).
//  Em caso de erro no banco, responde com status 500.
