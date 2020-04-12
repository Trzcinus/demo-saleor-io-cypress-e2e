/// <reference types="cypress" />
const saleorDev = Cypress.env('accounts');
context('buy item flow e2e test', () => {
  before(() => {
    cy.visit('');
    cy.login(saleorDev.user.email, saleorDev.user.password);
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should add pillow to basket', () => {
    cy.get('.main-menu__item')
      .first()
      .click();
    cy.get('[href="/product/colored-parrot-cushion/85/"]')
      .click();
    cy.get('.product-description__variant-picker')
      .click();
    cy.contains('55cm x 55cm')
      .click();
    cy.get('.product-description__action')
      .click();
  });
  it('should go to checkout ', () => {
    cy.get('.main-menu__cart')
      .click();
    cy.contains('Checkout')
      .click();
  });
  it('should fill shipping adddress ', () => {
    cy.get('.address-picker__address', { timeout: 10000 })
      .contains('Vietnam')
      .click();
    cy.get('.button')
      .contains('Continue to Shipping')
      .click();
    cy.wait(2000);
  });
  it('should fill shipping method ', () => {
    cy.url('eq', 'https://demo.saleor.io/checkout/shipping-options/', { timeout: 1000 });
    cy.get('.c-option', { timeout: 10000 })
      .first()
      .click();
    cy.get('.button')
      .contains('Continue to billing')
      .click();
    cy.wait(2000);
  });
  it('should fill billing address ', () => {
    cy.get('.address-picker__address', { timeout: 10000 })
      .contains('Vietnam')
      .click();
    cy.get('.button')
      .contains('Proceed to Payment')
      .click();
  });
  it('should fill payment method', () => {
    cy.wait(2000);
    cy.get('.c-option', { timeout: 10000 })
      .first()
      .click();
    cy.get('.button')
      .contains('Continue to Review Your Order')
      .click();
  });
  it('should finalise checkout ', () => {
    cy.get('.button')
      .contains('Place your order')
      .click();
    cy.get('h3', { timeout: 10000 })
      .should('be.visible');
  });
});
