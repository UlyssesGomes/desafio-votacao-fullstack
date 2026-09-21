describe('Detalhar Pauta', () => {
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
            cy.visit(`/pautas/${id}`);
        });
    });

    describe.only('Data que existe uma pauta cadastrada e não iniciou sessão', () => {
        it('Deve exibir o id, título, descrição.', () => {
            const elements = [id, titulo, descricao];
            cy.get('[data-cy="detail-value"]')
                .should('have.length', 3)
                .each(($el, index) => {
                    cy.wrap($el).should('contain.text', elements[index]);
                });
        });

        it('Deve exibir o botão de iniciar sessão.', () => {
            cy.button('sessao-button').should('contain.text', 'Abrir Sessão');
        });

        it('Deve ser possível iniciar sessão e exibir horário de inicio e fim.', () => {
            cy.button('sessao-button').click();
            cy.button('iniciar-sessao').click();
            cy.get('[data-cy="detail-value"]')
                .should('have.length', 5);
        });
    });

    describe.only('Data que existe uma pauta cadastrada e iniciou sessão', () => {
        beforeEach(() => {
            cy.button('sessao-button').click();
            cy.button('iniciar-sessao').click();
        });

        it('Deve exibir modal de contagem.', () => {
            cy.button('count-votes').click();
            cy.get('[data-cy="vote-count-dialog"] [role="dialog"]').should('be.visible');
        });
    });

    afterEach(() => {
        cy.request('DELETE', `${api()}/pautas/${id}`);
    })
});