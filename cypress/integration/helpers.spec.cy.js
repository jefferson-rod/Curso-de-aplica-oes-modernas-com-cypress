/// <reference types="cypress" />

describe('Helpers ...', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')//o obj não é um elemento da biblioteca do cypress, utilizando o cy.wrap eu meio que encapsulo ele como se fosse da biblioteca do cypress para poder usar o should

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('#formNome').then($el => {
        //$el.val('funciona via jquerry')//exemplo jquerry
        //   cy.wrap($el).type('funciona via cypress')
        //  })

        cy.get('#buttonSimple').then(() => { console.log('Encontrei o primeiro botão') })
        cy.wrap(Promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => { console.log('Encontrei o segundo botão') })

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    //o comando its pega uma propriedade de um objeto
    it('Its...', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.eq', 'User')

        const obj2 = { nome: 'User', idade: 20, endereço: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereço').should('have.property', 'rua')
        cy.wrap(obj2).its('endereço').its('rua').should('contain', 'bobos')//aqui nos temos o problema do should que deve ser corrigido com o then, logo abaixo vemos qual a melhor forma 
        cy.wrap(obj2).its('endereço.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('to.equal', 20)
    })

    it('Invoke ...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'texto via invoke')
        cy.window().invoke('alert', 'Da pra ver?')
        cy.get('#resultado')
            .invoke('html', '<imput type="button", value="hacked!"/>')
    })
})