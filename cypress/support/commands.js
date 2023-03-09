Cypress.Commands.add('fillMandatoryFieldsANdSubmit', function(){
    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('emerson@emerson.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button',"Enviar").click()
})
