/// <reference types="cypress" />

describe('Work with Popup', () => {
    before(() => {
    })

    it('Deve testar Popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html') // os frames por serem páginas externas possuem sua propria URL a qual iremos passar no cy.visit
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')

        })
    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') //o stub é um evento mockado, quando eu for pedir a invocação desse stub, como dei um nome para ele tenho que passar junto um @ para que ele não fique a procura de ima classe ou id 
    })
})

describe('With links....', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Check popup url', () => {
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal', 'https://wcaquino.me/cypress/frame.html')
    })

    it('Should acess popup dinamically', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('funciona')
        })
    })

    it('Should force link on same page', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#tfield').type('funciona')
    })
})
