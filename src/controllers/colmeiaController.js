var colmeiasModel = require("../models/colmeiasModel");

function kpi1 (req, res) {
    Promise.all([
        colmeiasModel.kpi1TotalDeColmeias(),
        colmeiasModel.kpi1QuantidadeDeColmeiasEmAlerta(),
        colmeiasModel.kpi1ColmeiasEmAlerta()
    ])
    .then(function (resultados) { // O .then é a resposta caso o banco responder corretamente, aí ele registra na array do JSON
        res.status(200).json({
            totalColmeias: resultados[0],
            qntEmAlerta: resultados[1],
            colmeiasEmAlerta: resultados[2]
        });
    })
    .catch (function (erro) {   // O .catch é se caso der algum erro nas coletas do banco de dados
        console.log("Erro ao buscar as informações da 1º KPI: ", erro.sqlMessage || erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

function kpi2 (req, res) {
    Promise.all([
        colmeiasModel.kpi2QuaisColmeiasEmAdaptacao(),
        colmeiasModel.kpi2QuantidadeDeColmeiasEmAdaptacao()
    ])
    .then(function (resultados) { // O .then é a resposta caso o banco responder corretamente, aí ele registra na array do JSON
        res.status(200).json({
            colmeiasEmAdaptacao: resultados[0],
            qntEmAdaptacao: resultados[1]
        });
    })
    .catch (function (erro) {   // O .catch é se caso der algum erro nas coletas do banco de dados
        console.log("Erro ao buscar as informações da 2º KPI: ", erro.sqlMessage || erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

function kpi4 (req, res) {
    Promise.all([
        colmeiasModel.kpi4TotalDeSensoresAtivos(),
        colmeiasModel.kpi4QuantidadeDeColmeiasComProblemas(),
        colmeiasModel.kpi4QuaisColmeiasComProblemas(),
    ])
    .then(function (resultados) { // O .then é a resposta caso o banco responder corretamente, aí ele registra na array do JSON
        res.status(200).json({
            totalSensoresAtivos: resultados[0],
            qntColmeiasComProblemas: resultados[1],
            quaisColmeiasComProblemas: resultados[2]
        });
    })
    .catch (function (erro) {   // O .catch é se caso der algum erro nas coletas do banco de dados
        console.log("Erro ao buscar as informações da 4º KPI: ", erro.sqlMessage || erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
    kpi1,
    kpi2,
    //kpi3,
    kpi4
}