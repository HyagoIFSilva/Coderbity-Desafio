# Desafio Técnico de QA - Colmeia Automação Cypress

Este repositório contém a automação de testes E2E para a aplicação web do desafio técnico da Colmeia (https://teste-colmeia-qa.colmeia-corp.com/).

O objetivo principal destes testes não é apenas navegar pelo site, mas sim documentar e validar de forma automatizada **bugs e comportamentos inesperados** que foram identificados na plataforma durante a exploração exploratória manual.

## 🛠️ Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/)**: Framework de automação E2E focado na web.
- **Node.js**: Ambiente de execução Javascript.

## 🐛 Bugs Documentados na Automação

Durante a análise exploratória, os seguintes comportamentos inesperados foram detectados e incorporados como cenários de teste para validação de falhas:

1. **Falha Crítica no Login**: Ao inserir as credenciais, corretas ou não, um modal com a mensagem *"Seu login está incorreto, quer continuar?"* é exibido. Se o usuário confirmar, o sistema libera o acesso para a dashboard mesmo com senhas incorretas.
2. **Falha de Sessão**: O sistema não encerra a sessão corretamente, permitindo que o usuário acesse a dashboard utilizando o recurso de avançar/voltar do navegador.
3. **Tela em Branco (Blank Page)**: O botão `Colmeia Forms` no menu lateral redireciona a URL com sucesso, mas o sistema falha em renderizar qualquer conteúdo, deixando o usuário em uma tela 100% vazia.
4. **Ausência de Logout e Interação no Perfil**: O menu do "Candidato" no canto superior direito é não interativo e falha em prover um botão de "Sair/Logout".
5. **Links Inativos no Login**: O botão "Esqueceu sua senha?" não possui função, e a tela sequer possui uma opção de "Cadastrar" (Melhoria UX/Bug).
6. **Ausência de Persistência (Banco de Dados)**: Ao criar um banco de dados, caso a página sofra um *refresh* (F5), os dados são perdidos imediatamente.
7. **Falha no Arquivamento (Banco de Dados)**: Arquivar um banco de dados faz com que ele desapareça da lista ativa, mas não conste na aba de arquivados (Perda de dados aparente).
8. **Quebra de Controle de Acesso (Vulnerabilidade Crítica)**: O sistema não verifica se o usuário possui um token de sessão válido nas rotas protegidas. É possível acessar as páginas internas do sistema de forma direta colando a URL no navegador (ex: `/dashboard/campanha/colmeia-forms`), burlando completamente a tela de login.

## 📂 Estrutura do Projeto

Os testes foram organizados de forma lógica e sequencial na pasta `cypress/e2e/`:

- `1-login.cy.js`: Testes que garantem o funcionamento da tela de login e evidenciam a falha crítica de segurança.
- `2-dashboard.cy.js`: Testes que verificam o carregamento da Dashboard e a abertura do menu lateral esquerdo.
- `3-bancos_de_dados.cy.js`: Testes simulando o fluxo para tentar criar um novo banco de dados.
- `4-colmeia_forms.cy.js`: Testes que tentam acessar o Colmeia Forms para evidenciar que o clique não gera ação e a URL não muda.

Foi criado também um comando customizado em `cypress/support/commands.js` chamado `cy.login(email, senha)`, garantindo a reusabilidade do código e deixando os testes mais limpos.

## 🚀 Como executar o projeto na sua máquina

### Pré-requisitos
- Ter o [Node.js](https://nodejs.org/en) instalado.
- Ter o [Git](https://git-scm.com/) instalado (opcional, para clonar).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Para abrir o painel interativo do Cypress (Modo Visual):**
   ```bash
   npx cypress open
   ```
   - Selecione a opção **E2E Testing**.
   - Escolha o navegador da sua preferência.
   - Clique em qualquer um dos arquivos `.cy.js` para assistir o teste rodando.

4. **Para rodar todos os testes em segundo plano (Headless Mode):**
   ```bash
   npx cypress run
   ```

## 📝 Boas Práticas Adotadas
- **Cypress Custom Commands**: Otimização de tempo e legibilidade no fluxo principal.
- **Base URL centralizada**: O domínio está configurado no `cypress.config.js`, não havendo necessidade de passar links "hardcoded" nos arquivos.
- **Evidências Claras**: Asserts que testam ativamente o DOM visível para buscar a mensagem do bug no modal, evidenciando falha.
- **Isolamento de Estado**: Cypress lida naturalmente com limpeza de cookies entre um `it()` e outro (testIsolation ativo), garantindo que um teste não influencie em outro.

---
*Desafio desenvolvido com foco em qualidade de software, organização e senso analítico para resolução de problemas reais.*
