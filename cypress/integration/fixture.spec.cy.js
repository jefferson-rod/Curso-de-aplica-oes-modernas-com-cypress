/// <reference types="cypress" />

describe('Fixtures tests', () => {
    it('Get data form fixtures file',function () { // nas primeiras aulas tive problemas com o uso do this em arrow function, por isso neste teste vamos usar a função de calback mostrando um caso do seu uso
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.fixture("userData").as('usuario').then(() => {

            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy="dataSobrenome"]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click() //nesse metodo de get cujo se usa o value, observar a forma identica a qual o value está escrito inspecionando o elemento
            cy.get('[data-test="dataEscolaridade"]').select(this.usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)

        })
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })
})
