describe('Autenticação de Usuários', () => {

  it('deve evidenciar o bug do modal de erro aparecendo mesmo com credenciais corretas', () => {
    cy.login('qa@test.com', '123456');
    cy.contains('Seu login está incorreto, quer continuar?').should('be.visible');
    cy.contains('button', 'Continuar').click();
    cy.url().should('include', '/dashboard');
  });

  it('deve confirmar que o sistema barra acessos com credenciais incorretas', () => {
    cy.login('qa@test.com', 'senha_errada');
    cy.contains(/quer continuar/i, { timeout: 4000 }).should('not.exist');
    cy.url().should('not.include', '/dashboard');
    cy.wait(2000);
  });

  it('deve confirmar que o sistema barra login com campos vazios (Comportamento Correto)', () => {
    cy.visit('/');
    cy.contains('button', 'Entrar').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve evidenciar que o link "Esqueceu sua senha?" é inativo (Dead Link)', () => {
    cy.visit('/');
    cy.contains('Esqueceu sua senha?').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.wait(2000);
  });

  it('deve evidenciar a ausência de funcionalidade para criar uma nova conta', () => {
    cy.visit('/');
    cy.contains(/cadastrar|criar conta/i).should('not.exist');
    cy.wait(2000);
  });

  it('deve evidenciar a persistência indevida de sessão ao avançar/voltar no navegador', () => {
    cy.login('qa@test.com', '123456');
    cy.contains('Continuar').click({ force: true });
    cy.url().should('include', '/dashboard');
    cy.wait(2000); 
    
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.wait(2000); 
    
    cy.go('forward');
    cy.url().should('include', '/dashboard');
    cy.wait(2000); 
  });

  it('deve evidenciar a Quebra de Controle de Acesso (IDOR) via URL direta', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/dashboard/campanha/colmeia-forms');
    cy.url().should('include', '/dashboard');
    cy.get('aside').should('exist');
  });

});
