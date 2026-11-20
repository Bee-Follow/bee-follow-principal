var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var { nome, email, cpf, telefone, idApiario, senha } = req.body;

    if (!nome || !email || !cpf || !telefone || !idApiario || !senha) {
        return res.status(400).send("Preencha todos os campos.");
    }
    if (senha.length < 8) {
        return res.status(400).send("A senha precisa ter 8 ou mais caracteres.");
    }

    usuarioModel.cadastrar(nome, email, cpf, telefone, idApiario, senha)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send(erro.sqlMessage || erro.message || "Erro ao cadastrar.");
        });
}

function autenticar(req, res) {
    var { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Informe e-mail e senha.");
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(403).send("E-mail e/ou senha inválidos.");
            }
            if (resultado.length > 1) {
                return res.status(403).send("Mais de um usuário com o mesmo login.");
            }
            var u = resultado[0];

            res.json({ id: u.id, nome: u.nome, email: u.email, idApiario: u.idApiario });     
       })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao autenticar.");
        });
}

module.exports = {
    cadastrar,
    autenticar
};

// O controller recebe a requisição do front-end, extrai os dados do req.body
// e valida se os campos foram preenchidos. Na função cadastrar, 
// também verifica se a senha tem pelo menos 8 caracteres e então chama o model
//  para inserir o funcionário no banco. Na função autenticar, chama o model para 
//  buscar o usuário por email e senha: se não encontrar nenhum, retorna 403;
//  se encontrar um, devolve ao front-end seus dados (sem a senha). 
//  Em caso de erro no banco, responde com status 500.