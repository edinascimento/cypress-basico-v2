Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get('[id="firstName"]')
    .type("Edipo")
    .get('[id="lastName"]')
    .type("Nascimento")
    .get('[id="email"]')
    .type("testestat@gmail.com")
    .get('[id="phone"]')
    .type("119999999")
    .get('[id="open-text-area"]')
    .type("Help me by sending this message", {
      delay: 0,
    })
    .get('button[type="submit"]')
    .click()
});
