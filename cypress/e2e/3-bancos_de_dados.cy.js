describe('Gestão de Bancos de Dados', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click();
    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.contains('Bancos de dados').click();
  });

  it('deve acessar a tela de listagem de bancos de dados', () => {
    cy.url().should('include', '/dashboard/campanha/bancos-de-dados');
    cy.contains('Bancos de dados').should('be.visible');
    cy.contains('Nenhum banco de dados encontrado').should('be.visible');
  });

  it('deve validar a ausência de persistência de dados (Bug do F5)', () => {
    const dbName = 'Banco Teste QA';
    
    // Clica no botão Criar e insere o nome
    cy.contains('button', 'Criar').click();
    
    // Usa o botão Enter direto no input, evitando depender do texto ou ícone do botão "Salvar"
    cy.get('input').last().type(`${dbName}{enter}`, { force: true });

    // Valida que o banco foi "criado" na tela
    cy.wait(1000);
    cy.contains(dbName, { timeout: 10000 }).should('exist');

    // Simula o recarregamento da página (F5)
    cy.reload();

    // O sistema não tem persistência. O banco recém criado sumiu.
    cy.contains(dbName).should('not.exist');
    cy.contains(/Nenhum banco de dados|vazio/i).should('exist');
  });

  it('deve validar o fluxo de arquivamento defeituoso (Bug Documentado)', () => {
    const dbName = 'Banco Arquivar QA';
    
    // Cria o banco temporariamente
    cy.contains('button', 'Criar').click();
    cy.wait(1000); // Pausa visual
    cy.get('input').last().type(`${dbName}{enter}`, { force: true, delay: 100 });
    cy.wait(2000); // Pausa visual para ver o item criado

    // Clica na opção de arquivar do banco criado (geralmente um ícone ou botão dentro do item listado)
    // Usamos expressão regular ou classes genéricas baseadas na experiência descrita
    cy.contains(dbName).parent().find('button, svg').last().click(); 
    // Aceita eventual modal de confirmação
    cy.contains(/arquivar|confirmar/i).click();

    // Acessa a aba ou botão de "Arquivados"
    cy.contains(/arquivados/i).click();

    // O bug acontece aqui: Mesmo após arquivar, a lista de arquivados está vazia
    cy.contains(dbName).should('not.exist');
  });

});
