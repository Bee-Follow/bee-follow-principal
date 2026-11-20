var database = require("../database/config");

function cadastrar(nome, email, cpf, telefone, idApiario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrar():", nome, email, cpf, telefone, idApiario);

    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, cpf, telefone, codigo_apiario, senha)
        VALUES ('${nome}', '${email}', '${cpf}', '${telefone}', '${idApiario}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n\n function autenticar():", email);

    var instrucaoSql = `
        SELECT id, nome, email, codigo_apiario AS idApiario
        FROM funcionario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar
};

// O model é responsável pela comunicação com o banco de dados. 
// A função cadastrar recebe os dados do funcionário e monta um INSERT 
// na tabela funcionario.

// A função autenticar recebe email e senha e monta 
// um SELECT para verificar se existe um funcionário com essas credenciais. 
// Ambas executam o SQL por meio de database.executar() e retornam o resultado ao controller.