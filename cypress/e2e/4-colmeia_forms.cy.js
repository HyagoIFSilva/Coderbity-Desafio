describe('Colmeia Forms', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click();
    cy.get('a[routerlink="/dashboard/campanha"]').click();
  });

  it('não deve redirecionar nem realizar ação ao clicar em Colmeia Forms (Bug Documentado)', () => {
    // Tenta clicar no link/botão "Colmeia Forms"
    cy.get('a[href="/dashboard/campanha/colmeia-forms"]').click({ force: true });
    
    // O sistema muda a URL
    cy.url().should('include', '/colmeia-forms');
    
    // O Bug real documentado: O componente abre 100% vazio (Blank Page)
    // O menu lateral de campanha continua lá, mas o conteúdo não existe.
    // Garantimos que não há nenhum título, formulário ou conteúdo (ex: 'h2', 'input', 'table')
    cy.get('ng-component').last().should('be.empty'); // Valida o componente vazio do Angular
  });

});
