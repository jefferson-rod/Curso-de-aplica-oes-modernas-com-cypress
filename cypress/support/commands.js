// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickAlert', (locator,message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {     //o comando (cy.on) captura ações que ocorrem na janela inteira,neste comando eu estou pedidno para capturar na janela a mensagem de alerta que vem através do windows alert 
        console.log(msg)
        expect(msg).to.be.equal(message)

    })
})