/// <reference types="Cypress"/>

describe("Central de Atendimento ao Cliente TAT", function () {
  let message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi illum voluptatibus ullam quis dolores, recusandae qui eaque aliquid voluptatem provident porro, incidunt deleniti, tenetur rem doloremque deserunt suscipit ipsa.";

  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get('[id="firstName"]')
      .type("Edipo")
      .get('[id="lastName"]')
      .type("Nascimento")
      .get('[id="email"]')
      .type("testestat@gmail.com")
      .get('[id="phone"]')
      .type("119999999")
      .get('[id="open-text-area"]')
      .type(message, {
        delay: 0,
      })
      .get('button[type="submit"]')
      .click()

      .get('[class="success"]')
      .should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get('[id="email"]')
      .type("formato@invalido")
      .get('button[type="submit"]')
      .click()
      .get(".error")
      .should("be.visible");
  });

  it("Campo telefone permanece vazio se digitado um valor náo-numérico", () => {
    cy.get('[id="phone"]').type("teste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('[id="firstName"]')
      .type("Edipo")
      .get('[id="lastName"]')
      .type("Nascimento")
      .get('[id="email"]')
      .type("testestat@gmail.com")
      .get('[id="phone-checkbox"]')
      .click()
      .should("be.checked")
      .get('[id="open-text-area"]')
      .type(message, {
        delay: 0,
      })
      .get('button[type="submit"]')
      .click()

      .get(".error")
      .should("be.visible");
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
        .type('Edipo')
        .should('have.value', 'Edipo')
        .clear()
        .should('have.value', '')
    cy.get('#lastName')
        .type('Nascimento')
        .should('have.value', 'Nascimento')
        .clear()
        .should('have.value', '')
    cy.get('#phone')
        .type('11999999999')
        .should('have.value', '11999999999')
        .clear()
        .should('have.value', '')
    cy.get('#email')
        .type('esntestes@mail.com')
        .should('have.value', 'esntestes@mail.com')
        .clear()
        .should('have.value', '')
    cy.get('#open-text-area')
        .type('text message')
        .should('have.value', 'text message')
        .clear()
        .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]')
      .click()

      .get(".error")
      .should("be.visible");
  })

  it.only('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    .get('[class="success"]')
    .should("be.visible");
  })
});
