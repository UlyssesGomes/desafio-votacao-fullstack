/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
    namespace Cypress {
        interface Chainable {
            /** Devolve o <input>/<textarea> real de um campo marcado com data-cy. */
            field(name: string): Chainable<JQuery<HTMLElement>>;
            /** Devolve o elemento de mensagem de error com data-cy. */
            errorMessage(name: string): Chainable<JQuery<HTMLElement>>;
            /** Abre um p-select e escolhe a opção pelo texto exibido. */
            selectOption(name: string, text: string): Chainable<void>;
            /** Devolve o <button> real de um p-button marcado com data-cy. */
            button(name: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}

Cypress.Commands.add('field', (name: string) => {
    return cy
        .get(`[data-cy="${name}"]`)
        .then(($el) =>
            $el.is('input, textarea') ? cy.wrap($el) : cy.wrap($el).find('input, textarea')
        );
});

Cypress.Commands.add('selectOption', (name: string, text: string) => {
    cy.get(`[data-cy="${name}"]`).click();
    cy.contains('[role="option"]', text).click();
});

Cypress.Commands.add('button', (name: string) =>
    cy.get(`[data-cy="${name}"] button, button[data-cy="${name}"]`)
);

Cypress.Commands.add('errorMessage', (name: string) =>
    cy.get(`[data-cy="${name}"]`)
);

export { };