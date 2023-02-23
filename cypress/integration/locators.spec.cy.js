/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('using jquerry selector', () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) input')
        cy.get("[onclick*='Francisco']")
        //cy.get('tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        // cy.get('tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    })

    // ver como usar o xpath no cypress//

    //it.only('using xpath', () => {
    //
    //   cy.xpath('//input')
    // })

})