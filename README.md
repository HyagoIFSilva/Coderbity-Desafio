# Desafio Técnico de QA - Colmeia Automação Cypress

Este repositório contém a automação de testes E2E para a aplicação web do desafio técnico da Colmeia (https://teste-colmeia-qa.colmeia-corp.com/).

O objetivo principal destes testes não é apenas navegar pelo site, mas sim documentar e validar de forma automatizada **bugs e comportamentos inesperados** que foram identificados na plataforma durante a exploração exploratória manual.

## 🛠️ Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/)**: Framework de automação E2E focado na web.
- **Node.js**: Ambiente de execução Javascript.

## 🐛 Bugs Documentados na Automação

Durante a análise exploratória, os seguintes comportamentos inesperados foram detectados e incorporados como cenários de teste para validação de falhas:

1. **Falha UX/Lógica no Login**: Ao inserir as credenciais **corretas** (`qa@test.com` e `123456`), o sistema exibe indevidamente um modal com a mensagem *"Seu login está incorreto, quer continuar?"*. Apesar da mensagem de erro, se o usuário confirmar, o sistema libera o acesso para a dashboard. (Tentativas com credenciais incorretas são corretamente barradas, confirmando que a falha está no fluxo de sucesso e não em uma liberação geral).
2. **Falha de Sessão**: O sistema não encerra a sessão corretamente, permitindo que o usuário acesse a dashboard utilizando o recurso de avançar/voltar do navegador.
3. **Tela em Branco (Blank Page)**: O botão `Colmeia Forms` no menu lateral redireciona a URL com sucesso, mas o sistema falha em renderizar qualquer conteúdo, deixando o usuário em uma tela 100% vazia.
4. **Ausência de Logout e Interação no Perfil**: O menu do "Candidato" no canto superior direito é não interativo e falha em prover um botão de "Sair/Logout".
5. **Links Inativos no Login**: O botão "Esqueceu sua senha?" não possui função, e a tela sequer possui uma opção de "Cadastrar" (Melhoria UX/Bug).
6. **Ausência de Persistência (Banco de Dados)**: Ao criar um banco de dados, caso a página sofra um *refresh* (F5), os dados são perdidos imediatamente.
7. **Falha no Arquivamento (Banco de Dados)**: Arquivar um banco de dados faz com que ele desapareça da lista ativa, mas não conste na aba de arquivados (Perda de dados aparente). *(Observação de UX: Além do bug, o sistema peca ao não exibir um modal de confirmação antes do arquivamento, permitindo perdas de dados por cliques acidentais).*
8. **Quebra de Controle de Acesso (Vulnerabilidade Crítica)**: O sistema não verifica se o usuário possui um token de sessão válido nas rotas protegidas. É possível acessar as páginas internas do sistema de forma direta colando a URL no navegador (ex: `/dashboard/campanha/colmeia-forms`), burlando completamente a tela de login.
9. **Armadilha de Navegação (Navigation Trap)**: Ao entrar em um submenu (como a tela de "Bancos de dados" através do botão de megafone), não há nenhuma forma de retornar à Dashboard principal pela interface da aplicação. A logo "Colmeia" no *header* não é clicável e não existe um botão "Voltar" ou "Home", forçando o usuário a usar as setas do próprio navegador.
10. **Ausência de Validação de Duplicidade**: O sistema permite a criação de múltiplos bancos de dados com o exato mesmo nome (ex: "nome_duplo"). Em sistemas reais, a falta de restrição de unicidade (Unique Constraint) para entidades críticas como Bancos de Dados pode causar conflitos severos de ID, corrupção de dados e confusão para o usuário final.
11. **Risco Crítico de Perda de Dados na Exclusão**: Assim como no arquivamento, a função de excluir um banco de dados é ativada instantaneamente ao clique, sem exibir nenhum modal de confirmação (ex: *"Tem certeza que deseja excluir?"*). Tratando-se da deleção de um banco de dados inteiro, um clique acidental resultaria em uma perda catastrófica e irreversível de informações.
12. **Bypass de Validação (Banco Sem Nome)**: Ao tentar criar um banco de dados vazio, o sistema inicialmente bloqueia a ação e exibe a mensagem de erro *"O nome do item é obrigatório"*. Porém, ao clicar em "Salvar" pela segunda vez, a validação é ignorada (bypass) e o sistema cria a entidade com o nome em branco. Isso demonstra uma grave falha no controle de estado do formulário (React/Angular).
13. **Falha de Roteamento SPA (Exposição de Infraestrutura)**: Ao acessar rotas inexistentes da aplicação de forma direta (ex: `/bancos-de-dados` em vez da sub-rota correta), o servidor não possui o fallback configurado para o `index.html`. O resultado é a quebra total da aplicação e a exposição de um erro XML bruto da AWS S3 (`NoSuchKey`), revelando detalhes sensíveis da infraestrutura de nuvem e gerando uma péssima experiência ao usuário (Página 404 ausente).

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
   git clone <https://github.com/HyagoIFSilva/Coderbity-Desafio>
   cd <Coderbity-Desafio>
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
- **Integração Contínua (CI/CD)**: O projeto conta com um workflow configurado no Github Actions (`.github/workflows/cypress.yml`) pronto para executar a esteira de testes automaticamente a cada Pull Request.
- **Base URL centralizada**: O domínio está configurado no `cypress.config.js`, não havendo necessidade de passar links "hardcoded" nos arquivos.
- **Evidências Claras**: Asserts que testam ativamente o DOM visível para buscar a mensagem do bug no modal, evidenciando falha.
- **Isolamento de Estado**: Cypress lida naturalmente com limpeza de cookies entre um `it()` e outro (testIsolation ativo), garantindo que um teste não influencie em outro.

## Melhorias Futuras (Decisões Arquiteturais)
- **Login Programático**: Atualmente, os testes de interface dependem do fluxo visual de login (`beforeEach`). Em um ambiente de produção real com centenas de testes, essa abordagem na UI seria substituída por requisições de API (`cy.request()`) para injetar o token JWT diretamente no navegador, otimizando drasticamente o tempo de execução da esteira de CI/CD.
- **Data Driven Testing**: Implementar testes utilizando fixtures ou planilhas de dados para varrer múltiplos cenários de formulários com um único bloco de teste estruturado.

---
*Desafio desenvolvido com foco em qualidade de software, organização e senso analítico para resolução de problemas reais.*
