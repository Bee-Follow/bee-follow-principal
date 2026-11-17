# AGENTS.md

## Visão geral


## Tecnologias

Tecnologias utilizadas no projeto: HTML, CSS, JavaScript, SQL
Frameworks: Node.js, Express.js.
Banco de dados: MySQL.
Bibliotecas: cors, dotenv, express, mysql2, nodemon, path.

## Comandos

- 'npm i': para a instalação das bibliotecas necessárias para o funcionamento do projeto. As bibliotecas para serem instaladas estão listadas no package.json, após a instalação será criado um novo diretório chamado node_modules.

- 'npm start': este comando servirá para iniciar o projeto e efetuar os comandos que foram parametrizados em processos anteriores.

- 'npm run dev': inicia o servidor em modo desenvolvedor.

- 'CRTL + C': execução do servidor no terminal

## Arquitetura

Estrutura e responsabilidade dos diretórios:

- /web-data-viz/node_modules: criada após o comando 'npm i', com as bibliotecas necessárias para o funcionamento do projeto.
- /web-data-viz/public; contendo os arquivos .html da primeira parte do front end do web site, onde o usuário irá 'ver'.
- /public/dashboard: contendo os arquivos .html da dashboard do web site.
- /public/js: contendo os arquivos alerta.js e sessao.js, que são responsáveis por fazer a chamada dos dados já capturados e armazenados em arrays, para executar as funções de alertas na dashboard e validar o login do usuário, respectivamente.
- src/routes; contem os arquivos .js onde são estipuladas as rotas que os dados serão enviados.
- src/controllers:  contem os arquivos .js que servem para validar e seguir regras estipuladas para o dado precisa passar antes da montagem da query.
- src/models: contem os arquivos .js responsáveis pela criação de todas as querys que serão efetuadas no banco de dados.
- src/database: contem o arquivo config.js, responsável pelo credenciamento do banco de dados para efetuar a query montada nos processos anteriores.

Fluxo da requisição: 

1. /public/(arquivos contendo .html): Interação do usuário com o front-end
2. routes: requisição do usuário no front-end é recebida através do metódo HTTP
3. controllers: valida os dados recebidos 
4. models: cria a estrutura de instrução do SQL (insert, update, select ou delete)
5. /database/config.js: executa a instrução SQL montada no processo anterior, utilizando as credenciais fornecidas

Onde criar novos arquivos:

- /public: arquivos .html para o front-end;
- /public/css: arquivos .css para o front-end;
- /public/dashboard: arquivos .html para o front-end da dashboard;
- /public/js: arquivos .js para scripts do usuário do web site;
- /src/routes: arquivos .js para estipular as rotas onde os dados serão enviados, ao criar o novo recurso, *sempre* registrá-lo no arquivo app.js, importando router e endpoint;
- /src/controllers: arquivos .js que receberá as requisições e validará os dados;
- /src/models: arquivos .js com os scripts SQL para consulta, inserção, atualização ou exclusão;
- /src/database: arquivos .js para configuração do credenciamento do banco de dados.

## Padrões de desenvolvimento

- Utilizar var por padrão e const apenas quando houver necessidade, para declaração de variáveis.
- Padrão de nomenclatura para arquivos, funções e variáveis:
        - Os arquivos, funções, variáveis, devem possuir um nome autoexplicativo para sua serventia, como, por exemplo, a      função'buscarUltimasMedidas', é perceptível através do nome que a função buscará as ultimas medidas.
        - Os arquivos, funções, variáveis que possuírem apenas uma palavra devem ser padronizados com todas as letras minusculas, como, por exemplo, 'public'. E arquivos, funções, variáveis que possuírem mais de uma palavra, devem ser padronizados com a primeira palavra inteira minuscula e as demais com apenas a primeira letra maiuscúla, como, por exemplo, 'idAquarioUsuario'.
- Utilizar apenas as tecnologias, bilbiotecas, frameworks que estão incluidas dentro da estrutura do projeto.
- Comentar cada função, explicando para que serve.

## Cuidados e restrições

- Não alterar nenhuma estrutura já presente no repositório do projeto, sem antes aprovação.
- A aprovação de toda mudança deverá passar por mim.
- Não é permitido aplicar novas tecnologias, frameworks, bibliotecas etc, sem antes aprovação.
- Os comentários em código deverão ser sucintos e explicativos
- Os comentários em código deverão ser escritos apenas em português do Brasil (pt-BR)
- A alternância do ambiente de desenvolvimento é feita na variável 'ambiente_processo' no arquivo app.js:
        - 'desenvolvimento', carrega as variáveis de ambiente a partir do arquivo .env.dev
        - 'producao', carrega as variáveis de ambiente a partir do arquivo .env


## Regra geral: 

Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.
