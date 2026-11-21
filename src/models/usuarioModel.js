var database = require("../database/config");

function cadastrar(nome, email, senha, fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrar():", nome, email, senha, fk_empresa);

    var instrucaoSql = `
        INSERT INTO funcionarios (nome, email, senha_hash, fk_empresa)
        VALUES ('${nome}', '${email}', '${senha}', '${fk_empresa}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n\n function autenticar():", email);

    var instrucaoSql = `
        SELECT 
            f.id,
            f.nome,
            f.email,
            f.fk_empresa,
            a.id AS fk_apiario
        FROM funcionarios f
        JOIN empresa e ON e.id = f.fk_empresa
        LEFT JOIN apiario a ON a.fk_empresa = e.id
        WHERE f.email = '${email}' AND f.senha_hash = '${senha}'
        LIMIT 1;
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