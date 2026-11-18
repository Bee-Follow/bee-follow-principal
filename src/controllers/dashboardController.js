var dashboardModel = require("../models/dashboardModel");

function buscarUltimasMedidas(req, res) {

    // const limite_linhas = 7;

    var idApiario = req.params.idApiario;

    dashboardModel.buscarUltimasMedidas(idApiario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarSensoresAtivos(req, res) {

    // const limite_linhas = 7;

    var idApiario = req.params.idApiario;

    dashboardModel.buscarSensoresAtivos(idApiario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos sensores ativos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarAlertas(req, res) {

    // const limite_linhas = 7;

    var idApiario = req.params.idApiario;

    dashboardModel.buscarAlertas(idApiario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos alertas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    buscarUltimasMedidas,
    buscarSensoresAtivos,
    buscarAlertas
}