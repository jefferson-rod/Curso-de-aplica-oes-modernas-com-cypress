/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()//logo abaixo vou precisar verificar o resultado novamente então uso esse comando para recarregar a pagina e obter o valor novamente 
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()//para encontrar elementos pode ser usado o contains ao inves do get passando o nome como contexto
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('Text fields', () => {
        cy.get('#formNome').type('Cypress test')
        cy.get('#formNome').should('have.value', 'Cypress test')

        cy.get('#elementosForm\\:sugestoes').type('textarea')
        cy.get('#elementosForm\\:sugestoes').should('have.value', 'textarea')

        cy.get('[data-cy="dataSobrenome"]')
            .type('teste12345{backspace}{backspace}')
            .should('have.value', 'teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')
        cy.get('#formSexoFem')
            .should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({ multiple: true })
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau incompleto')
            .should('have.value', '2grauincomp')

        cy.get('[data-test="dataEscolaridade"]')
            .select('1grauincomp')
            .should('have.value', '1grauincomp')

        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', 8)

        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it('ComboMultiplo', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida', 'nada'])//ao selecionar combos multiplos os campos a serem selecionados devem estar dentro de um array
        // cy.get('[data-testid="dataEsportes"]').should('have.value',['natacao', 'Corrida','nada'])//esse metodo seria o jeito facil mais não funciona
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)

            cy.get('[data-testid="dataEsportes"]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida', 'nada'])

        })


        //TODO validar opções selecionadas do combo multiplo
    })
})