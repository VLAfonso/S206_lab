/// <reference = cypress>

describe("Testes da criação, registro e login", ()=>{
  it("Teste criação de usuário com sucesso", ()=>{
    criarUsuario()
  })

  it("Teste criação de usuário com falha", ()=>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Nome")
    cy.get('#Text1').type("Sobrenome")
    cy.get('#username').type("Usuário")

    cy.get('.btn-primary').should("be.disabled")
  })

  it("Teste de login com sucesso", ()=>{
    let infos = criarUsuario()
    cy.login(infos[0], infos[1])
    cy.get('h1.ng-binding').should("contain.text", infos[0])
  })

  it("Delete do usuário com sucesso", ()=>{
    let infos = criarUsuario()
    cy.login(infos[0], infos[1])
    cy.get('h1.ng-binding').should("contain.text", infos[0])
    cy.get('.ng-binding > a').click()
    cy.get('h1.ng-binding').should("not.contain.text", infos[0])
    cy.get('.btn').click()
    cy.login(infos[0], infos[1])
    cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")
  })
})

function criarUsuario(){
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let ID = hora + minuto + seg + "ID" 
  let Senha = hora + minuto + seg + "Senha" 
  let infos = [ID, Senha]

  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should("contain.text", "Registration successful")

  return infos
}