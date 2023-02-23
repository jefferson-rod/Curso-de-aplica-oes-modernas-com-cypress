/// <reference types="cypress" />

describe('Esperas ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')//o comando find procura mais a fundo um elemento a qual o escopo ja foi reduzido
            .should('contain', 'Item 1')
        //caso eu quisesse realizar a assertiva com o item 2 eu teria que elevar o escopo
        // até o span sem usar o find pois não poderia colocar dois comandos e duas assertivas juntas 
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        //cy.get('#novoCampo', { timeout: 3000 }).should('exist')

        cy.get('#buttonListDOM').click()
        //cy.wait(5000)//neste comando eu estou dizendo ao cypress para esperar fixamente, no caso de validar um campo que ainda vai aparecer na tela 
        cy.get('#lista li span', { timeout: 30000 })//este é o metodo mais recomendado pois ele pode ate pedir 30s mais assim que confirmar ele roda o testes sem esperar o resto
            .should('contain', 'Item 2')
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })

    it('Should vs Them', () => {
        cy.get('#buttonListDOM')
        .then($el => {//no exemplo them estou referenciando um elemento com el, não é obrigatotio o sifrão, como se trata de um elemento jquerry então não posso utilizar o .should para validar mais posso substituir o them pelo mesmo, neste caso uso o expect :ver asserts.spec
            //< .should('have.length',1) />
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
    })
})