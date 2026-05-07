describe('Autenticação de Usuários', () => {

  it('deve evidenciar o bug do modal de erro aparecendo mesmo com credenciais corretas', () => {
    cy.login('qa@test.com', '123456');
    cy.contains('Seu login está incorreto, quer continuar?').should('be.visible');
    cy.contains('button', 'Continuar').click();
    cy.url().should('include', '/dashboard');
  });

  it('deve evidenciar falha crítica permitindo acesso com senha incorreta', () => {
    cy.login('qa@test.com', 'senha_errada');
    cy.contains(/Seu login está incorreto/i, { timeout: 10000 }).should('be.visible');
    
    // O sistema permite o acesso mesmo com senha errada
    cy.contains(/Continuar/i, { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/dashboard');
  });

  it('deve confirmar que o sistema barra login com campos vazios (Comportamento Correto)', () => {
    cy.visit('/');
    cy.contains('button', 'Entrar').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve evidenciar que o link "Esqueceu sua senha?" é inativo (Dead Link)', () => {
    cy.visit('/');
    cy.contains('Esqueceu sua senha?').click();
    // Verifica que a URL não mudou e nenhuma tela abriu
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve evidenciar a ausência de funcionalidade para criar uma nova conta', () => {
    cy.visit('/');
    // Como a página não tem opção de criar conta, validamos que o texto/botão não existe
    cy.contains(/cadastrar|criar conta/i).should('not.exist');
  });

  it('deve evidenciar a persistência indevida de sessão ao avançar/voltar no navegador', () => {
    cy.login('qa@test.com', '123456');
    cy.contains('Continuar').click({ force: true });
    cy.url().should('include', '/dashboard');
    
    // Simula voltar a página no navegador
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Simula avançar a página. Em um sistema seguro, deveria pedir login novamente
    cy.go('forward');
    
    // O sistema loga automaticamente (falha de sessão persistente indevida)
    cy.url().should('include', '/dashboard');
  });

  it('deve evidenciar a Quebra de Controle de Acesso (IDOR) via URL direta', () => {
    // Limpa os cookies para garantir que estamos deslogados
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Tenta acessar uma rota protegida diretamente sem passar pelo login
    cy.visit('/dashboard/campanha/colmeia-forms');

    // Em um sistema seguro, o usuário deveria ser redirecionado para a tela de login.
    // O Bug: O sistema permite o acesso e a URL continua a mesma da área restrita.
    cy.url().should('include', '/dashboard/campanha/colmeia-forms');
    
    // Valida que o menu interno da plataforma carregou, provando o acesso indevido
    cy.get('aside').should('exist');
  });

});
