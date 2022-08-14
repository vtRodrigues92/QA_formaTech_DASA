/// <reference types = 'cypress' />

const faker = require('faker-br');  
var email = faker.internet.email();                                             /// email randomico
var pass = faker.internet.password();                                           /// password randomico
var zipCode = faker.address.zipCode();                                          /// codigo postal randomico
var phone_number = faker.phone.phoneNumber();                                   /// numero de telefone randomico
var mobile_number = faker.phone.phoneNumber();  
var adrdressSecondary = faker.address.secondaryAddress();                       /// endereço randomico

var first_name = email.split(/[_.@1234567890]+/);                               ///regex para separar strings
var last_name = email.split(/[_.@1234567890]+/);                                ///regex para separar strings




context('Projeto de conclusão da formação Tech_QA-Victor de Oliveira Rodrigues', () => {
    beforeEach(() => cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account'))
    
    it('Realizar Cadastro', () => {
        /// informação inicial
        cy.get('#email_create').type(email)                      /// E-mail
        cy.get('#SubmitCreate').click()                          /// Continuar o cadastro
        cy.wait(2000)
        

        /// Informações pessoais
        cy.get('#id_gender1').click()                            /// Escolhendo o gênero
        cy.get('#customer_firstname').type(first_name[0])        /// Nome  
        cy.get('#customer_lastname').type(last_name[1])          /// Sobre Nome
        cy.get('#passwd').type(pass)                             /// Senha
        cy.get('#days').select('25')                             /// Dia do nascimento
        cy.get('#months').select('11')                           /// Mês do nascimento
        cy.get('#years').select('2000')                          /// Ano do nascimento
        cy.get('#newsletter').click()                            /// Assinar newsletter
        cy.get('#optin').click()                                                                                                                                    /// Receber ofertas especiais
        

        /// Endereço
        cy.get('#company').type('DASA')
        cy.get('#address1').type('Av das Américas, 3200 - Barra da Tijuca')
        cy.get('#address2').type('Prédio')
        cy.get('#city').type('Rio de Janeiro')
        cy.wait(1000)
        cy.get('#id_state').select('California')
        cy.get('#postcode').type(zipCode)
        cy.get('#other').type('Teste de cadastro Formação Tech DASA')
        cy.get('#phone').type(phone_number)
        cy.get('#phone_mobile').type(mobile_number)
        cy.get('#alias').type(adrdressSecondary)
        cy.get('#submitAccount').click()
    });


    it('Efetuando Sign in / Comprando 3 itens', () => {

    cy.get('.login').click()                                                                                                                                            
        cy.get('#email').type(email)
        ///cy.get('#email').type('victor.o.rodrigues11@gmail.com')
        cy.get('#passwd').type(pass)
        ///cy.get('#passwd').type('fORDBRACOM')
        cy.get('#SubmitLogin > span').click()
    


        /// Comprando Produto 1
        cy.get('#block_top_menu > ul > li:nth-child(1) > a').click()                                                                                                    /// Selecionando Women
        cy.get('#center_column > ul > li:nth-child(2) > div > div.left-block > div > a.product_img_link > img').click()                                                 /// Escolhendo Blusa
        cy.get('#group_1').select('M')                                                                                                                                  /// Selecionando tamanho M 
        cy.get('#color_8').click()                                                                                                                                      /// Selecionando cor branca
        cy.get('.exclusive > span').click()                                                                                                                             /// Adicionando no carrinho  
        cy.wait(3000)
        cy.get('.continue > span').click()                                                                                                                              /// Continuar comprando      



        /// Comprando Produto 2
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()                                                                                                        /// Selecionando Dresses
        cy.get('.first-in-line.first-item-of-tablet-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x').click()      /// Escolhendo Saia       
        cy.get('#quantity_wanted').clear()                                                                                                                              /// Limpando o campo quantidade                   
        cy.get('#quantity_wanted').type(3)                                                                                                                              /// Inserindo quantidade 3       
        cy.get('#group_1').select('L')                                                                                                                                  /// Selecionando tamanho L
        cy.get('#add_to_cart > button').click()                                                                                                                         /// Adicionando no carrinho
        cy.wait(3000)
        cy.get('.continue > span').click()                                                                                                                              /// Continuar comprando

        

        /// Comprando Produto 3
        cy.get('#search_query_top').type('summer dress')                                                                                                                /// Pesquisando por vestido de verão
        cy.get('#searchbox > .btn').click()                                                                                                                             /// Clicando no botão pesquisar
        cy.get(':nth-child(2) > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x').click()                                 /// Selecionando vestido
        cy.get('#group_1').select('S')                                                                                                                                  /// Selecionando o tamanho
        cy.get('#add_to_cart > button').click()                                                                                                                         /// Adicionando no carrinho    
        cy.wait(3000)


        /// prosseguindo para o checkout
        cy.log('prosseguindo para o checkout')

        cy.get('.button-medium > span').click()
        cy.get('.cart_navigation > .button > span').click()
        

        /// Validar se foi selecionado meu endereço de entrega
        cy.log('Validar se foi selecionado meu endereço de entrega')

        cy.get('#id_address_delivery').should('contain', 'My address')


        /// Validar se o endereço de cobrança está marcado
        cy.log('Validar se o endereço de cobrança está marcado')

        cy.get('#addressesAreEquals').should('be.checked') 
        cy.get('.cart_navigation > .button > span').click()


        /// Validar se deixa prosseguir sem aceitar os termos / checkout
        cy.log('Validar se deixa prosseguir sem aceitar os termos / checkout')

        cy.get('.cart_navigation > .button > span').click()
        cy.get('.fancybox-error').should('be.visible')
        cy.get('.fancybox-error').should('have.text', 'You must agree to the terms of service before continuing.')
        cy.get('.fancybox-item').click()
        cy.get('#cgv').check()
        cy.get('.cart_navigation > .button > span').click()
        cy.get('.bankwire').click()


     
        /// Validar confirmação da ordem de compra
        cy.log('Validar confirmação da ordem de compra')

        cy.get('#cart_navigation > .button > span').click()
        cy.wait(5000)
        cy.get('.box').should('be.visible')
    
    });


    it('Validar se ao clicar no logo, é redirecionado para a paginal principal', () => {

        cy.get('#header_logo > a > img').click()
        cy.get('#slider_row').should('be.visible')

    });

                                                       
});