// ***********************************************
// Aqui você pode adicionar comandos customizados
// para simplificar testes repetitivos.
// ***********************************************

// Comando customizado para realizar login
Cypress.Commands.add('login', (email, senha) => {
  // Garante que o teste inicie totalmente deslogado
  cy.clearCookies();
  cy.clearLocalStorage();
  
  cy.visit('/');
  cy.wait(1500); // Pausa para o recrutador ver a tela
  
  // Interage com os inputs lentamente
  cy.get('input').first().type(email, { delay: 100 });
  cy.wait(500);
  cy.get('input').last().type(senha, { delay: 100 });
  cy.wait(1000); // Pausa antes de clicar
  
  cy.contains('button', 'Entrar').click();
  cy.wait(1500); // Pausa para ver a transição
});
