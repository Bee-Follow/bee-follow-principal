create database beefollow;
use beefollow;

-- tabela empresa
create table empresa (
id int primary key auto_increment,
nome varchar(100) not null,
cnpj char(14) not null unique,
dataCadastro datetime default current_timestamp,
ativo tinyint(1)
constraint chkAtivo check (ativo in(0, 1))
);

-- tabela apiario
create table apiario (
id int primary key auto_increment,
nome varchar(100) not null,
dataCadastro datetime default current_timestamp,
fk_empresa int,
constraint cfk_apiario_empresa foreign key (fk_empresa) references empresa(id)
);

-- tabela endereço

create table endereco(
id int primary key auto_increment,
rua varchar(100),
numero varchar(10),
bairro varchar(100),
estado varchar(50),
cep char(8) not null,
complemento varchar(200),
fk_apiario int,
constraint cfk_apiario_endereco foreign key (fk_apiario) references apiario(id)
);

-- funcionario
CREATE TABLE funcionario(
id INT PRIMARY KEY AUTO_INCREMENT,
codigo_apiario CHAR(8) NOT NULL,
nome VARCHAR(100) not null,
senha varchar(20) not null,
cpf CHAR(11) not null unique,
fk_empresa INT,
constraint ckfk_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
);

-- tabela contato
create table contato (
id int primary key auto_increment,
telefone varchar(20),
email varchar(50),
fk_contato_empresa int,
constraint cfk_contato_empresa foreign key (fk_contato_empresa) references empresa(id),
fk_contato_func int,
constraint cfk_contato_func foreign key (fk_contato_func) references funcionario(id)
);

-- tabela colmeia
create table colmeia (
id int primary key auto_increment,
descricao VARCHAR(45),
datainstalacao datetime,
fk_apiario_colmeia int,
constraint cfk_colmeia_apiario foreign key (fk_apiario_colmeia) references apiario(id)
);

-- tabela sensor
create table sensor (
id int primary key auto_increment,
modelo char(4) not null default 'lm35',
datainstalacao datetime,
ultimamanutencao datetime,
funcionando tinyint(1),
constraint chk_funcionando check (funcionando in(0, 1)),
fk_colmeia int,
constraint cfk_sensor_colmeia foreign key (fk_colmeia) references colmeia(id)
);

-- tabela leitura_temperatura
create table leitura_temperatura (
id int primary key auto_increment,
temperatura decimal(5,2) not null,
datahora datetime default current_timestamp,
fk_sensor int,
constraint fk_sensor foreign key (fk_sensor) references sensor(id)
);

-- tabela alerta
create table alerta (
id int primary key auto_increment,
tipoAlerta varchar(45) not null,
dataHora datetime default current_timestamp,
status_alerta tinyint(1) default 0,
constraint chk_status check (status_alerta in(0, 1)),
fk_leitura_temperatura int,
constraint cfk_alerta_leitura foreign key (fk_leitura_temperatura) references leitura_temperatura(id)
);


-- ========================================================
-- INSERTS
-- ========================================================
INSERT INTO empresa (nome, cnpj, ativo) VALUES
('Apicultura Vale do Sol Ltda', '12345678000195', 1),
('Mel & Cia Agropecuaria','98765432000110', 1),
('Cooperativa Apícola Serra','45678912000133', 1);

INSERT INTO apiario (nome, fk_empresa) VALUES
('Apiário Flores da Floresta', 1),
('Apiário Pouso Alegre', 2),
('Apiário Montanha Alta', 3);

INSERT INTO endereco (rua, numero, bairro, estado, cep, complemento, fk_apiario) VALUES
('Estrada das Meliponas', 'S/N', 'Zona Rural', 'São Paulo', '12940000', 'Sítio Boa Vista - Gleba B', 1),
('Rodovia dos Bandeirantes', 'KM 45', 'Sertãozinho', 'Minas Gerais', '37550000', 'Próximo ao alambique', 2),
('Estrada do Vento', '100', 'Alto da Serra', 'Rio de Janeiro', '28600000', 'Fazenda Esperança', 3);

INSERT INTO funcionario (nome, senha, cpf, fk_apiario_func) VALUES
('Carlos Eduardo','Senha123!', '11122233344', 1),
('Ana Beatriz','Ab123456#', '55566677788', 2),
('Roberto Silva','Pass9876$', '99988877766', 3);

INSERT INTO contato (telefone, email, fk_contato_empresa, fk_contato_func) VALUES
('11987654321','contato@valedosol.com.br', 1, NULL),
('35991234567','atendimento@melecia.com',  2, NULL),
('35991234562','atendimento@alta.com',  3, NULL),
('21995556666','carlos.eduardo@email.com', NULL, 1),
('11944443333','ana.beatriz@email.com',    NULL, 2),
('21995556656','roberto.silva@email.com', NULL, 3);

INSERT INTO colmeia (datainstalacao, fk_apiario_colmeia) VALUES
('2024-02-01 08:00:00', 1),
('2024-02-01 08:30:00', 1),
('2024-04-05 09:10:00', 2),
('2024-05-20 14:00:00', 3);

INSERT INTO sensor (datainstalacao, ultimamanutencao, funcionando, fk_colmeia) VALUES
('2024-02-02 10:00:00', '2026-01-10 11:00:00', 1, 1),
('2024-02-02 10:30:00', '2026-02-01 09:00:00', 1, 2),
('2024-04-06 11:00:00', '2026-03-01 16:20:00', 1, 3),
('2024-05-21 15:00:00', '2026-02-15 09:00:00', 1, 4);

INSERT INTO leitura_temperatura (temperatura, fk_sensor) VALUES
(34.50, 1),
(38.20, 2),
(36.00, 3),
(34.00,  4);

INSERT INTO alerta (tipoAlerta, status_alerta, fk_leitura_temperatura) VALUES
('Temperatura Alta', 0, 2),
('Temperatura Baixa', 0, 1),
('Temperatura Baixa', 0, 4);

-- consultar os dados
select * from empresa;
select * from contato;
select * from apiario;
select * from endereco;
select * from colmeia;
select * from sensor;
select * from leitura_temperatura;
select * from alerta;

-- qual empresa é responsável por cada apiário?
select
empresa.nome AS 'Nome empresa',
apiario.nome AS 'Nome apiário',
endereco.rua as 'Endereço apiário'
from empresa
join apiario on apiario.fk_empresa = empresa.id
join endereco on endereco.fk_apiario = apiario.id;

-- quais colmeias pertencem a cada apiário?
select
apiario.nome,
colmeia.datainstalacao
from colmeia
join apiario on colmeia.fk_apiario_colmeia = apiario.id;

-- qual sensor está instalado em cada colmeia e ele está funcionando?
select
colmeia.id,
sensor.modelo,
sensor.ultimamanutencao,
case
	when sensor.funcionando = 1 then 'sensor ativo'
    else "sensor inativo" 
end as "status sensor"
from colmeia
join sensor on sensor.fk_colmeia = colmeia.id;

-- qual temperatura foi registrada em cada colmeia e em que horário?
select
colmeia.id,
apiario.nome,
leitura_temperatura.temperatura,
leitura_temperatura.dataHora
from colmeia
join sensor on sensor.fk_colmeia = colmeia.id
join leitura_temperatura on leitura_temperatura.fk_sensor = sensor.id
join apiario on colmeia.fk_apiario_colmeia = apiario.id;

-- qual colmeia registrou uma temperatura associada a um alerta?
select
colmeia.id,
leitura_temperatura.temperatura,
alerta.tipoalerta,
case
when alerta.status_alerta = 0 then 'Pendente'
else 'Resolvido'
end as 'Status Alerta',
case
	when alerta.status_alerta = 0 then 'alerta vermelho'
	else "alerta verde" 
end as "alertas"
from colmeia
join sensor on sensor.fk_colmeia = colmeia.id
join leitura_temperatura on leitura_temperatura.fk_sensor = sensor.id
join alerta on alerta.fk_leitura_temperatura = leitura_temperatura.id
order by colmeia.id;

-- selects principais de cada tabela
select
nome,
concat(contato.telefone, ' - ', contato.email, ' - ', datacadastro) as contato,
case ativo
when 1 then 'Ativo'
when 0 then 'Inativo'
else 'Inválido'
end as situacao
from empresa
join contato on empresa.id = contato.fk_contato_empresa;

select
colmeia.id as 'Id Colmeia',
modelo as 'Modelo Sensor',
case
when ultimamanutencao is null then 'Nunca teve manutenção'
else concat(datediff(curdate(), ultimamanutencao), ' dias atrás')
end as 'Status Manutenção'
from sensor
join colmeia on sensor.fk_colmeia = colmeia.id;

select
concat(temperatura, ' ºC ') as temperatura,
date_format(datahora, '%d/%m/%Y %H:%i:%s') as 'Data e hora',
case
when temperatura between 34 and 36 then 'Normal'
when temperatura > 36 then 'Temperatura elevada, precisa de atenção'
when temperatura < 34 then 'Temperatura abaixo do ideal, precisa de atenção'
end as classificacao
from leitura_temperatura;
