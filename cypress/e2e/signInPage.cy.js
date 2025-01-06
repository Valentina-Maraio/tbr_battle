describe('SignInPage Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/callback/credentials', (req) => {
      if (req.body.email === 'test@example.com' && req.body.password === 'password123') {
        req.reply({ statusCode: 200, body: { ok: true, error: null } });
      } else {
        req.reply({ statusCode: 401, body: { ok: false, error: 'Invalid email or password.' } });
      }
    }).as('signInRequest');
    cy.visit('/api/auth/signin');  // Correct route for the sign-in page
  });

  it('renders the sign-in form', () => {
    cy.get('h1').should('contain.text', 'Sign In');
    cy.wait(1000);  // Adjust wait time if needed
    cy.get('form').should('exist');
    cy.get('input#email', { timeout: 10000 }).should('exist');  // Ensure the input element is found
    cy.get('input#password').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain.text', 'Sign In');
  });

  it('shows an error when email or password is incorrect', () => {
    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@signInRequest');
    cy.get('.text-red-500').should('contain.text', 'Invalid email or password.');
  });

  it('redirects to the dashboard on successful sign-in', () => {
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@signInRequest');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/dashboard`);
    cy.window().its('localStorage.justLoggedIn').should('equal', 'true');
  });
});
