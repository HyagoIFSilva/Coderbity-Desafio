// ***********************************************************
// Arquivo de suporte principal para a automação.
// Ele é carregado automaticamente antes dos arquivos de teste.
// ***********************************************************

import './commands'

// Desativando exceções não capturadas para evitar que os testes 
// falhem por erros do próprio frontend do site que não estamos validando agora
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


