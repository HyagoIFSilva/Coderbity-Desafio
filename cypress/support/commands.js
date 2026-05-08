Cypress.Commands.add('login', (email, senha) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  
  cy.visit('/');
  cy.wait(1500); 
  
  cy.get('input').first().type(email, { delay: 100 });
  cy.wait(500);
  cy.get('input').last().type(senha, { delay: 100 });
  cy.wait(1000); 
  
  cy.contains('button', 'Entrar').click();
  cy.wait(1500); 
});
