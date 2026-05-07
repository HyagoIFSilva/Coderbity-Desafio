describe('Dashboard e Navegação Principal', () => {

  beforeEach(() => {
    cy.login('qa@test.com', '123456');
    cy.contains('button', 'Continuar').click(); 
  });

  it('deve carregar a dashboard com sucesso', () => {
    cy.url().should('include', '/dashboard');
    cy.get('aside').should('exist'); 
  });

  it('deve abrir o menu de campanhas ao clicar no ícone de megafone', () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click(); 
    cy.contains('Bancos de dados').should('be.visible');
    cy.contains('Colmeia Forms').should('be.visible');
  });

  it('deve exibir interações válidas no menu do perfil do candidato (Bug Documentado)', () => {
    // Tenta interagir com o menu do perfil (geralmente fica no header)
    // Foca especificamente no botão do header que contém o texto "Candidato"
    cy.contains('button', 'Candidato', { timeout: 10000 }).click({ force: true });

    // Como o botão não faz nada e não tem função de deslogar, evidenciamos a falha:
    // O sistema não renderiza nenhuma opção de "Sair" ou "Logout"
    cy.contains(/sair|logout|deslogar/i).should('not.exist');
  });

});
