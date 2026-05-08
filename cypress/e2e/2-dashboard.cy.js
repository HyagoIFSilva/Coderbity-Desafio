describe('Dashboard e Navegação Principal', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click(); 
  });

  it('deve carregar a dashboard com sucesso', () => {
    cy.url().should('include', '/dashboard');
    cy.get('aside').should('exist'); 
    cy.wait(2000);
  });

  it('deve abrir o menu de campanhas ao clicar no ícone de megafone', () => {
    cy.wait(1000);
    cy.get('a[routerlink="/dashboard/campanha"]').click(); 
    cy.wait(500);
    cy.contains('Bancos de dados').should('be.visible');
    cy.contains('Colmeia Forms').should('be.visible');
    cy.wait(2000);
  });

  it('deve exibir interações válidas no menu do perfil do candidato (Bug Documentado)', () => {
    cy.wait(500);
    cy.contains('button', 'Candidato', { timeout: 10000 }).click({ force: true });
    cy.contains(/sair|logout|deslogar/i).should('not.exist');
    cy.wait(2000);
  });

  it('deve evidenciar a ausência de botão Voltar/Home e logo inativa (Armadilha de Navegação)', () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click(); 
    cy.url().should('include', '/dashboard/campanha');
    cy.wait(1000);
    
    cy.contains('header', 'Colmeia').find('img').click({ force: true });
    cy.wait(1000); 
    
    cy.url().should('include', '/dashboard/campanha');
    cy.contains(/voltar|home|início/i).should('not.exist');
  });

});
