/// <reference types="cypress" />

describe('Work with iFrames', () => {
    before(() => {
    })

    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframes => {
            const body = iframes.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')

            //este caso abaixo tem um problema de limitação do cypress quando se trabalha com frames, o caso abaixo é a correção disso
            // cy.on('window:alert', msg => {
            //   expect(msg).to.be.equal('Alert simples')
            //})
            // cy.wrap(body).find('#otherbutton').click() //isso que fazia o teste quebrar
        })

    })

    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html') // os frames por serem páginas externas possuem sua propria URL a qual iremos passar no cy.visit
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')

        })
    })
})