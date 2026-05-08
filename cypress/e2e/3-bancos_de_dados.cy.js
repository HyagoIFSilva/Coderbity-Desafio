describe('Gestão de Bancos de Dados', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click();
    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.contains('Bancos de dados').click();
  });

  it('deve acessar a tela de listagem de bancos de dados', () => {
    cy.wait(500);
    cy.url().should('include', '/dashboard/campanha/bancos-de-dados');
    cy.wait(500);
    cy.contains('Bancos de dados').should('be.visible');
    cy.contains('Nenhum banco de dados encontrado').should('be.visible');
    cy.wait(2000);
  });

  it('deve validar a ausência de persistência de dados (Bug do F5)', () => {
    const dbName = 'Banco Teste QA';
    
    cy.wait(500);
    cy.contains('button', 'Criar').click();
    cy.wait(500);
    cy.get('input').last().type(`${dbName}{enter}`, { force: true });

    cy.wait(1000);
    cy.contains(dbName, { timeout: 10000 }).should('exist');

    cy.reload();
    cy.wait(500);
    cy.contains(dbName).should('not.exist');
    cy.wait(500);
    cy.contains(/Nenhum banco de dados|vazio/i).should('exist');
    cy.wait(1000);
  });

  it('deve validar o fluxo de arquivamento defeituoso (Bug Documentado)', () => {
    const dbName = 'Banco Arquivar QA';
    
    cy.contains('button', 'Criar').click();
    cy.wait(1000); 
    cy.get('input').last().type(`${dbName}{enter}`, { force: true, delay: 100 });
    cy.wait(2000); 

    cy.contains(dbName).parent('tr').find('.bi-archive-fill').click(); 
    cy.wait(1500); 

    cy.get('svg path[d^="M20 2H4c-1"]').parent('svg').parent('button').click();
    cy.wait(1500);

    cy.contains(dbName).should('not.exist');
  });

  it('deve confirmar que a funcionalidade de busca de bancos de dados opera corretamente (Cenário Positivo)', () => {
    const dbName = 'Banco Para Busca QA';
    
    cy.wait(500);
    cy.contains('button', 'Criar').click();
    cy.wait(500);
    cy.get('input').last().type(`${dbName}{enter}`, { force: true });
    cy.wait(1000); 

    cy.get('input').first().type('Busca QA');
    cy.wait(1500); 

    cy.contains(dbName).should('exist');

    cy.get('input').first().clear().type('Termo Inexistente');
    cy.wait(1500); 

    cy.contains(dbName).should('not.exist');
  });

  it('deve evidenciar a permissão indevida de criação de bancos com nomes duplicados (Bug Documentado)', () => {
    const dbName = 'Banco Duplicado QA';
    
    cy.wait(500);
    cy.contains('button', 'Criar').click();
    cy.wait(500);
    cy.get('input').last().type(`${dbName}{enter}`, { force: true });
    cy.wait(1000);
    
    cy.contains('button', 'Criar').click();
    cy.wait(500);
    cy.get('input').last().type(`${dbName}{enter}`, { force: true });
    cy.wait(1500); 
    
    cy.get(`tr:contains("${dbName}")`).should('have.length.at.least', 2);
  });

  it('deve evidenciar o bypass de validação ao criar um banco sem nome (Bug Documentado)', () => {
   
    cy.wait(500);
    cy.contains('button', 'Criar').click();
    cy.wait(500);
    
 
    cy.contains('button', 'Salvar').click();
    
    cy.contains('O nome do item é obrigatório').should('be.visible');
    cy.wait(1000);

    cy.contains('button', 'Salvar').click();
    cy.wait(1500); 

    
    cy.get('tbody tr').first().find('td').first().invoke('text').should('match', /^\s*$/);
  });

});
