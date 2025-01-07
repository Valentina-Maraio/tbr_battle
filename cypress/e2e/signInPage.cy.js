// cypress/e2e/signin.cy.js

describe('Sign In Page', () => {
  it('should load the sign in page and display the correct content', () => {
    // Visit the sign-in page (ensure it's correct based on your file structure)
    cy.visit('/'); // Ensure this URL matches your Next.js routing

    // Verify the page title
    cy.contains('h1', 'Sign In').should('be.visible');

    // Verify the email and password fields
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');

    // Verify the submit button
    cy.get('button[type="submit"]').should('contain', 'Sign In');
  });

  it('should display an error message for invalid credentials', () => {
    // Visit the sign-in page
    cy.visit('/signin');

    // Enter invalid email and password
    cy.get('input#email').type('invalid@example.com');
    cy.get('input#password').type('wrongpassword');

    // Submit the form
    cy.get('form').submit();

    // Verify the error message appears
    cy.get('.text-red-500').should('contain', 'Invalid email or password.');
  });

  it('should redirect to the dashboard on successful login', () => {
    // Visit the sign-in page
    cy.visit('/signin');

    // Enter valid email and password (mock the sign-in process if necessary)
    cy.get('input#email').type('valid@example.com');
    cy.get('input#password').type('correctpassword');

    // Stub the signIn function to simulate success
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 200,
      body: { success: true },
    }).as('signInRequest');

    // Submit the form
    cy.get('form').submit();

    // Wait for the request and verify redirection to the dashboard
    cy.wait('@signInRequest');
    cy.url().should('include', '/dashboard');
  });
});
