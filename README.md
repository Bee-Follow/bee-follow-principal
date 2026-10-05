# 🐝 Sistema de Monitoramento Térmico de Colmeias

## 📖 Sobre o Projeto
Este é um projeto de pesquisa e inovação desenvolvido no primeiro semestre do curso de Ciência da Computação. O objetivo é desenvolver um **sistema de monitoramento térmico contínuo** para colmeias do modelo *Langstroth* (o mais comum no Brasil). 

Através do uso de um Arduino e sensores de temperatura LM35, o sistema coleta informações do ambiente interno das colmeias e as disponibiliza em um painel (dashboard) interativo. A solução atua como uma ferramenta de apoio à decisão, permitindo que os apicultores acompanhem o histórico de variações térmicas e recebam alertas sobre comportamentos fora do padrão, otimizando o manejo e reduzindo inspeções desnecessárias.

**Atenção:** A proposta *não* busca substituir o conhecimento ou a inspeção física do apicultor, mas sim fornecer uma camada extra de acompanhamento preventivo. Não há automação do processo de refrigeração/aquecimento das colmeias.

## ✨ Funcionalidades
- **Monitoramento Contínuo:** Registro das temperaturas (interna e externa) ao longo do dia.
- **Histórico de Dados:** Armazenamento seguro de todas as medições para análise de longo prazo.
- **Alertas Inteligentes:** Emissão de alertas quando são identificadas alterações térmicas relevantes (considerando intensidade, duração e relação com o ambiente externo).
- **Dashboard Analítica:** Painel com gráficos e métricas claras para acompanhamento simultâneo de várias colmeias.
- **Apoio à Decisão:** Permite ao apicultor priorizar quais caixas necessitam de inspeção física baseando-se em dados reais.

## 🛠️ Tecnologias e Arquitetura

**Hardware:**
- Microcontrolador: Arduino
- Sensor: Sensor de Temperatura LM35

**Software & Arquitetura:**
- **Banco de Dados:** MySQL hospedado em um servidor de dados Linux (VMLinux).
- **Integração:** API Local em conjunto com o Arduino para captura e inserção de dados diretamente no banco MySQL.
- **Visualização:** Dashboard para transformação de dados brutos em gráficos e métricas de fácil leitura.

## 🗄️ Estrutura do Banco de Dados
A modelagem de dados foi desenhada para suportar o fluxo constante do sensor:
1. Modelagem Lógica (v1)
2. Script de criação do Banco de Dados
3. Inserção automatizada de dados do Arduino para o MySQL via VMLinux.

---
*Projeto desenvolvido como parte dos requisitos acadêmicos do curso de Ciência da Computação.*