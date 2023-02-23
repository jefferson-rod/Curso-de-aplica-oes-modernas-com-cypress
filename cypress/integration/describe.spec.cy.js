/// <reference types="cypress" />

it('A external test', () => {

})
//o describe é um bloco que agrupa teste, no exemplo abaixo existe um describe dentro de outro describe assim podendo agrupar testes mais especificos
describe('Should group tests ...', () => {
    describe('Should group more specifc tests ...', () => {
        it('A specific test', () => {

        })

    })

    //caso eu deseje que o runner não execute um teste basta escrever o comando .skip após o it o mesmo vale para o bloco inteiro no caso describe
    describe('Should group more specifc tests 2 ...', () => {
        it('A specific test 2', () => {

        })
    })
})
it('A internal test', () => {

})

