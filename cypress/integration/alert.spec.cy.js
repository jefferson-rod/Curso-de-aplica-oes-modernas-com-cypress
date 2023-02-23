/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        //cy.on('window:alert', msg => {     //o comando (cy.on) captura ações que ocorrem na janela inteira,neste comando eu estou pedidno para capturar na janela a mensagem de alerta que vem através do windows alert 
        //  console.log(msg)
        //expect(msg).to.be.equal('Alert Simples')
        // })

        //cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('Alerta')// o comando as vem do alias e serve para dar nome aos bois, neste caso ao stub no log do cypress
        cy.on('window:alert', stub)  //o comando stub ele substitui uma função, armazena e ate controla a mesma, nesse exemplo ele substitui a chamada msg acima
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')//aqui na assertiva eu estou pedindo o stub para pegar a chamada (0) pois pode haver mais de uma e comparar com a chamada recebida usando (calledwith)

        })
    })

    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
    })


    it('Deny', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
    })

    it('Prompt', () => {  //nesta ação do prompt usando o cy.window e cy.stub foi mockada a ação e pedida para retornar 42, assim podendo isar o cy.on para validar a mensagem
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('jefferson')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy="dataSobrenome"]').type('rodrigues')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})