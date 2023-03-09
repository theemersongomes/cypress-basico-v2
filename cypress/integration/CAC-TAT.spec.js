/// <reference types="Cypress" />s

describe ("Central de atendimento ao Cliente TAT", function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulario', function(){
        const longText = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        cy.get('#firstName').type('Emerson')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('emerson@emerson.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button',"Enviar").click()
        cy.get('.success').should('be.visible')
    })
   
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Emerson')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('emerson@emerson,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button',"Enviar").click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Emerson')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('emerson@emerson.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button',"Enviar").click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Emerson')
          .should('have.value', 'Emerson')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Gomes')
          .should('have.value', 'Gomes')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('emerson@emerson.com')
          .should('have.value', 'emerson@emerson.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('123456789')
          .should('have.value', '123456789')
          .clear()
          .should('have.value', '')  
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button',"Enviar").click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formulario com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsANdSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu valor', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca o tipo do atendimento "Feedback"', function(){
        cy.get('input[type="radio"], [value="feedback"]')
          .check()
          .should('have.value', 'ajuda')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
         .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
           })
    })
    it('marca ambos checkboxes', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action:'drag-drop' })
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
        })
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('acessa a página da politica de privacidade removendo o target e então clicar', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

       cy.contains('Talking About Testing').should('be.visible') 

    })
 
})