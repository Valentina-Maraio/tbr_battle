<<<<<<< HEAD
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
=======
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
>>>>>>> e1efacb (cypress test)
  });
});
