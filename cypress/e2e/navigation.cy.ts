describe('Navigation Tests', () => {
    it('should navigate to the About page and back to Home', () => {
      // Visit Home Page
      cy.visit('/');
      cy.get('h1').should('be.visible');
  
      // Navigate to About Page
      cy.contains('Go to About Page').click();
      cy.url().should('include', '/about');
      cy.contains('About Us').should('be.visible');
  
      // Navigate Back to Home
      cy.contains('Go to Home Page').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('be.visible');

    });
  });
  