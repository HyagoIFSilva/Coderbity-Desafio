const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://teste-colmeia-qa.colmeia-corp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Desabilitar o cache para rodar sempre em ambiente limpo se necessário
    testIsolation: true,
    // Tamanho da janela padrão do Cypress
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
