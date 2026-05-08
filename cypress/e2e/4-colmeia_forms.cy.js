describe('Colmeia Forms', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click();
    cy.get('a[routerlink="/dashboard/campanha"]').click();
  });

  it('não deve redirecionar nem realizar ação ao clicar em Colmeia Forms (Bug Documentado)', () => {
    cy.get('a[href="/dashboard/campanha/colmeia-forms"]').click({ force: true });
    
    cy.url().should('include', '/colmeia-forms');
    
    cy.get('ng-component').last().should('be.empty'); 
  });

});
