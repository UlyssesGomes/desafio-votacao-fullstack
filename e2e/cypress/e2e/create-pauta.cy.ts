describe('Registrar Pauta', () => {
    const api = () => Cypress.expose('apiUrl');

    beforeEach(() => {
        cy.visit('/pautas/create');
    });

    describe('Dado que os dados estão incompletos', () => {
        it('Deve aparecer mensagem de erro no campo de título.', () => {
            cy.get('#titulo').type('Pint').blur();

            cy.errorMessage("titulo-error-message").should('be.visible');
            cy.errorMessage("titulo-error-message").should('contain.text', 'Mínimo de 5 caracteres.');
        });

        it('Deve aparecer mensagem de erro no campo de descrição.', () => {
            cy.get('#descricao').type('Aprovar o');

            cy.errorMessage("descricao-error-message").should('be.visible');
            cy.errorMessage("descricao-error-message").should('contain.text', 'Mínimo de 10 caracteres.');
        });
    });


    describe('Dado que os dados estão preenchidos corretamente', () => {
        const titulo = 'Pintura dos prédios.';
        const descricao = 'Aprovar orçamento para renovação das pintura dos prédios dos blocos A, B, C e D.';

        beforeEach(() => {
            cy.get('#titulo').type(titulo);
            cy.get('#descricao').type(descricao);
        })

        it('Deve habilitar o botão de Salvar.', () => {
            cy.button('save-button').should('be.enabled');
        });

        it('Deve deve retornar status 201, o título e a descrição preenchidos', () => {
            cy.intercept('POST', `${api()}/pautas`).as('savePauta');
            
            cy.button('save-button').click();

            cy.wait('@savePauta').then(({ response }) => {
                expect(response?.statusCode).to.eq(201);
                expect(response?.body.titulo).to.eq(titulo);
                expect(response?.body.descricao).to.eq(descricao);
                cy.log(`------- ${JSON.stringify(response)}`);
                
                const id = response?.body.id;
                cy.request('DELETE', `${api()}/pautas/${id}`);
            });
        });
    });


});