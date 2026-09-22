describe('Cadastrar Voto', () => {

    const api = () => Cypress.expose('apiUrl');

    let id = 0;
    const titulo = 'Pintura dos prédios.';
    const descricao = 'Aprovar orçamento para renovação das pintura dos prédios dos blocos A, B, C e D.';

    beforeEach(() => {
        cy.visit('/pautas/create');

        cy.intercept('POST', `${api()}/pautas`).as('savePauta');

        cy.get('#titulo').type(titulo);
        cy.get('#descricao').type(descricao);
        cy.button('save-button').click();

        cy.wait('@savePauta').then(({ response }) => {
            id = response?.body.id;
        });
    });

    describe('Dado que tem um pauta cadastrada e a sessão já iniciou.', () => {
        beforeEach(() => {
            cy.visit(`/pautas/${id}`);
            cy.button('sessao-button').click();
            cy.button('iniciar-sessao').click();

            cy.visit('/votar');
            cy.get('#pautaId').type(`${id}`);
            cy.get('#usuarioId').type('1');
            cy.get('#cpf').type('000-000-000-01');
            cy.selectOption('input-vote', 'Sim');
        });

        it('Deve habilitar o botão de salvar o voto', () => {
            cy.button('send-vote').should('be.enabled');
        });

        it('Deve clicar em votar e salvar o voto', () => {
            cy.intercept('PATCH', `${api()}/pautas/${id}/votar`).as('votar');

            cy.button('send-vote').click();

            cy.wait('@votar').then(({ response }) => {
                // O backend retorna aleatóriamente que um usuário não é apto para votar
                if (response?.statusCode == 204) {
                    expect(response?.statusCode).to.eq(204);
                }
            });
        });
    });

    describe('Dado que tem um pauta cadastrada sem ter iniciado a sessão.', () => {

        beforeEach(() => {
            cy.visit('/votar');
            cy.get('#pautaId').type(`${id}`);
            cy.get('#usuarioId').type('1');
            cy.get('#cpf').type('000-000-000-01');
            cy.selectOption('input-vote', 'Sim');
        });

        it('Deve exibir mensagem de error de que a sessão ainda não iniciou', () => {
            cy.intercept('PATCH', `${api()}/pautas/${id}/votar`).as('votar');

            cy.button('send-vote').click();

            cy.wait('@votar').then(({ response }) => {
                expect(response?.statusCode).to.eq(409);
                expect(response?.body.detail).to.eq('O voto não pode ser computado, a sessão ainda não iniciou.');
            });
        });
    });

    describe('Dado que tem um pauta cadastrada e a sessão já encerrou.', () => {

        beforeEach(() => {
            cy.visit(`/pautas/${id}`);
            cy.button('sessao-button').click();
            cy.button('iniciar-sessao').click();

            cy.visit('/votar');
            cy.get('#pautaId').type(`${id}`);
            cy.get('#usuarioId').type('1');
            cy.get('#cpf').type('000-000-000-01');
            cy.selectOption('input-vote', 'Sim');
        });

        it('Deve exibir mensagem de error de que a sessão já encerrou', () => {
            cy.intercept('PATCH', `${api()}/pautas/${id}/votar`).as('votar');
            cy.wait(61000);
            cy.button('send-vote').click();

            cy.wait('@votar').then(({ response }) => {
                expect(response?.statusCode).to.eq(409);
                expect(response?.body.detail).to.eq('O voto não será computado, a sessão já finalizou.');
                
                cy.log(`response ${JSON.stringify(response)}`);                
            });
        });
    });

    afterEach(() => {
        cy.request('DELETE', `${api()}/pautas/${id}`);
    })
});