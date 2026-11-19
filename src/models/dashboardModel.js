const dashboardController = require("../controllers/dashboardController");
var database = require("../database/config");

function buscarUltimasMedidas(idApiario) {

    var instrucaoSql = `select apiario.id,
                        leitura_temperatura.temperatura
                        from colmeia
                        join sensor on sensor.fk_colmeia = colmeia.id
                        join leitura_temperatura on leitura_temperatura.fk_sensor = sensor.id
                        join apiario on colmeia.fk_apiario_colmeia = apiario.id
                        where apiario.id = 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idApiario]);
}

function buscarSensoresAtivos(idApiario) {

    var instrucaoSql = `select
                        colmeia.id,
                        sensor.ultimamanutencao,
                        sensor.funcionando
                        from colmeia
                        join sensor on sensor.fk_colmeia = colmeia.id
                        where fk_apiario_colmeia = 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idApiario]);
}

function buscarAlertas(idApiario) {

    var instrucaoSql = `select
                        colmeia.id,
                        leitura_temperatura.temperatura,
                        alerta.dataHora
                        from colmeia
                        join sensor on sensor.fk_colmeia = colmeia.id
                        join leitura_temperatura on leitura_temperatura.fk_sensor = sensor.id
                        join alerta on alerta.fk_leitura_temperatura = leitura_temperatura.id
                        join apiario on colmeia.fk_apiario_colmeia = apiario.id 
                        where apiario.id = 1
                        order by colmeia.id;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idApiario]);
}

module.exports = {
    dashboardController,
    buscarUltimasMedidas,
    buscarSensoresAtivos,
    buscarAlertas
}
