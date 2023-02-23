/// <reference types="cypress" />

describe('Cypress basic', () => {
    it('Should visit a page and assert a title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //const title = cy.title()
        // console.log(title)

        // cy.pause()// este comando realiza uma pausa na execução a partir de onde foi inserido
        // .debug()// este comando tras informações no log do console a partir do ponto onde foi inserido

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contains', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contains', 'Campo')

        //no caso de promises tanto o then quanto o should tratam as promises
        //este exemplo abaixo e a resolução do primeiro exemplo comentado acima
        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            //TODO escrever o titulo em um campo de texto
            syncTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val(syncTitle)

        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)

        })

    })

    it('Should find and interact an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})

