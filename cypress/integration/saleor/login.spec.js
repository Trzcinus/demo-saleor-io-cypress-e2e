/// <reference types="cypress" />
import { ELEMENTS } from '../../support/elements';
context('Login e2e test', () => {
  const saleorDev = Cypress.env('accounts');
  before(() => {
    cy.visit('');
  });
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Login - happy path', () => {
    cy.get(ELEMENTS.login.loginLogo)
      .click();
    cy.get(ELEMENTS.login.email)
      .type(saleorDev.user.email);
    cy.get(ELEMENTS.login.password)
      .type(saleorDev.user.password);
    cy.get(ELEMENTS.login.submitButton)
      .click()
      .should(() => {
        expect(localStorage.getItem('token')).to.be.not.null;
      });
  });
  it('Login - fail show error invalid email', () => {
    cy.get(ELEMENTS.login.loginLogo)
      .click();
    cy.get(ELEMENTS.login.email)
      .type('test');
    cy.get(ELEMENTS.login.error)
      .should('be.visible')
      .contains('email');
    cy.get(ELEMENTS.login.closeButton)
      .click();
    cy.get(ELEMENTS.login.loginHeader)
      .should('not.be.visible');
  });
  it('Login - fail show error  empty fields', () => {
    cy.get(ELEMENTS.login.loginLogo)
      .click();
    cy.get(ELEMENTS.login.email)
      .clear();
    cy.get(ELEMENTS.login.password)
      .clear();
    cy.get(ELEMENTS.login.error)
      .should('be.visible');
    cy.get(ELEMENTS.login.closeButton)
      .click();
  });
  it('Login - fail show error  invalid cred', () => {
    cy.get(ELEMENTS.login.loginLogo)
      .click();
    cy.get(ELEMENTS.login.email)
      .type(saleorDev.user.email);
    cy.get(ELEMENTS.login.password)
      .type('test');
    cy.get(ELEMENTS.login.submitButton)
      .click();
    cy.get(ELEMENTS.login.inputError)
      .should('be.visible')
      .contains('credentials');
  });
});
