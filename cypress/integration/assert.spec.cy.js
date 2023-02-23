/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;
    expect(a).to.equal(1);
    expect(a, 'Deveria ser 1').to.equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');

})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;

})

it('Object equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).to.be.equal(obj)
    expect(obj).to.be.equals(obj)
    expect(obj).to.be.eq(obj)
    //expect(obj).to.be.equal({a: 1, b: 2})apesar da comparação ser igual ira mostrar um erro pois os elementos são distintos
    expect(obj).to.be.deep.equal({ a: 1, b: 2 })//esse erro se resolve adicionando o deep
    expect(obj).eql(obj)
    expect(obj).include({ a: 1 })//quando o objeto for muito grande para verificar então eu posso usar o include
    expect(obj).to.have.property('b', 2)//aqui eu posso verificar através da propriedade ou/e também o valor junto
    expect(obj).to.be.not.empty//aqui eu verifico que o objeto não esta vazio
    expect({}).to.be.empty//aqui eu valido que ele não recebe nada e está vazio

})

it('Arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).to.have.members([1, 2, 3])
    expect(arr).to.include.members([1, 3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty

})

it('Types', () => {
    const num = 1
    const str = "string"

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.a('object')
    expect([]).to.be.a('array')

})

it('String', () => {
    const str = 'string de teste'

    expect(str).to.be.equal('string de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^string/)//aqui eu digo que a string deve iniciar com string usando o sinal a frente da mesma
    expect(str).to.match(/teste$/)//usando esse sinal ao final eu digo que deve terminar com essa string
    expect(str).to.match(/.{15}/)

})

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)//espero que o number seja acima de 3
    expect(number).to.be.below(7)//espero que o number seja abaixo de 7
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1)//espero que seja proximo de 5.2 com proximidade de (0.1) <= obrigatório passar valor
//pode se dar uma assertiva usando o exemplo2 na questão de numeros com resultados não muito exatos

})