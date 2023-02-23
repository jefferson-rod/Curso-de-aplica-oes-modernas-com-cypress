/// <reference types="cypress" />

describe('Dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const food = ['carne', 'frango', 'pizza', 'vegetariano']
    food.forEach(food => { //aqui foi criado um laço utilizando o const acima que eu armazenei baseado no value

        it(`Cadastro com a comida ${food}`, () => { //incrementando o laço aqui eu vou dar nome de cada item selecionado ao teste ficando visivelmente mais organizado

            cy.get('#formNome').type('usuario')
            cy.get('[data-cy="dataSobrenome"]').type('qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.get(`[name=formComidaFavorita][value='${food}']`).click() //aqui o teste foi implementado o laço que realizara um teste para cada item de seleção
            cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
            cy.get('[data-testid="dataEsportes"]').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })

    it('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('usuario')
        cy.get('[data-cy="dataSobrenome"]').type('qualquer')
        cy.get(`[name=formSexo][value=F]`).click()
        cy.get(`[name=formComidaFavorita]`).each($el => {
            //            $el.click()
           // if ($el.val() 'vegetariano')
            cy.wrap($el).click()
    })
    cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
    cy.get('[data-testid="dataEsportes"]').select('Corrida')

    cy.get('#formCadastrar').click()
    // cy.get('#resultado > :nth-child(1)').should('contain', 'vegetariano')
    //TODO realizar assertiva do teste, somente colocando o sinal de diferente pode se descomentar a assertiva 

})
})