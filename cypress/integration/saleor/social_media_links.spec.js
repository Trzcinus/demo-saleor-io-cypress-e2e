/// <reference types="cypress" />
import { ELEMENTS } from '../../support/elements';
context('social media links e2e test', () => {
  before(() => {
    cy.visit('');
  });
  it('should check social media links', () => {
    cy.get(ELEMENTS.socialMedia.facebook)
      .should('have.attr', 'href')
      .and('include', 'https://www.facebook.com/mirumeelabs/');
    cy.get(ELEMENTS.socialMedia.instagram)
      .should('have.attr', 'href')
      .and('include', 'https://www.instagram.com/mirumeelabs/');
    cy.get(ELEMENTS.socialMedia.twitter)
      .should('have.attr', 'href')
      .and('include', 'https://twitter.com/getsaleor');
    cy.get(ELEMENTS.socialMedia.youtube)
      .should('have.attr', 'href')
      .and('include', 'https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos');
  });
});
