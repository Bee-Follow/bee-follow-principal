var database = require("../database/config");

function buscarUltimasMedidas(idApiario) {

    var instrucaoSql = `SELECT 
                            c.id,
                            lt.temperatura
                        FROM colmeia c
                        JOIN sensor s ON s.fk_colmeia = c.id
                        JOIN leitura_temperatura lt ON lt.fk_sensor = s.id
                        WHERE c.fk_apiario = ${idApiario}
                        AND lt.id IN (
                            SELECT MAX(lt2.id)
                            FROM leitura_temperatura lt2
                            JOIN sensor s2 ON lt2.fk_sensor = s2.id
                            GROUP BY s2.fk_colmeia
                        )
                        ORDER BY c.id;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensoresAtivos(idApiario) {

    var instrucaoSql = `select
                        colmeia.id,
                        DATE_FORMAT(sensor.ultimaManutencao, '%d/%m/%Y %H:%i:%s') as ultimamanutencao,
                        sensor.funcionando
                        from colmeia
                        join sensor on sensor.fk_colmeia = colmeia.id
                        where fk_apiario = ${idApiario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas(idApiario) {

    var instrucaoSql = `select
                        colmeia.id,
                        leitura_temperatura.temperatura,
                        DATE_FORMAT(alerta.dataHora, '%d/%m/%Y %H:%i:%s')
                        from colmeia
                        join sensor on sensor.fk_colmeia = colmeia.id
                        join leitura_temperatura on leitura_temperatura.fk_sensor = sensor.id
                        join alerta on alerta.fk_leitura_temperatura = leitura_temperatura.id
                        join apiario on colmeia.fk_apiario = apiario.id 
                        where apiario.id = ${idApiario}
                        order by alerta.dataHora;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarSensoresAtivos,
    buscarAlertas
}
