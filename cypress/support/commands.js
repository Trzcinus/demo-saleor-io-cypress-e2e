import { ELEMENTS } from './elements';
import 'cypress-localstorage-commands';
Cypress.Commands.add('login', (email, password) => {
  cy.get(ELEMENTS.login.loginLogo)
    .click();
  cy.get(ELEMENTS.login.email)
    .type(email);
  cy.get(ELEMENTS.login.password)
    .type(password);
  cy.get(ELEMENTS.login.submitButton)
    .click()
    .should(() => {
      expect(localStorage.getItem('token')).to.be.not.null;
    });
});
