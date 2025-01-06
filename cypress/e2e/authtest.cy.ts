describe('NextAuth Credentials Authentication', () => {
    beforeEach(() => {
      cy.visit('app/api/auth/[...nextaut]'); // Adjust the URL based on your app's routing
    });
  
    it('displays the sign-in form', () => {
      cy.get('h1').should('contain.text', 'Sign In'); // Ensure the page shows "Sign In"
      cy.get('form').should('exist'); // Ensure the form exists
      cy.get('input#email').should('exist'); // Check for email input
      cy.get('input#password').should('exist'); // Check for password input
      cy.get('button[type="submit"]').should('exist').and('contain.text', 'Sign In'); // Check for submit button
    });
  
    it('shows an error when invalid credentials are entered', () => {
      cy.get('input#email').type('wrong@example.com'); // Type an invalid email
      cy.get('input#password').type('wrongpassword'); // Type an incorrect password
      cy.get('button[type="submit"]').click(); // Submit the form
      cy.get('.text-sm.text-red-500') // Assuming error message is in this class
        .should('contain.text', 'Invalid email or password.'); // Verify error message
    });
  
    it('signs in successfully with valid credentials', () => {
      cy.get('input#email').type('user@example.com'); // Type a valid email
      cy.get('input#password').type('yourtbr'); // Type the correct password
      cy.get('button[type="submit"]').click(); // Submit the form
  
      // Check that the user is redirected to the dashboard
      cy.url().should('include', '/dashboard');
    });
  
    it('stores the session in localStorage after successful sign-in', () => {
      cy.get('input#email').type('user@example.com'); // Type a valid email
      cy.get('input#password').type('yourtbr'); // Type the correct password
      cy.get('button[type="submit"]').click(); // Submit the form
  
      // Check that "justLoggedIn" is stored in localStorage
      cy.window().then((window) => {
        expect(window.localStorage.getItem('justLoggedIn')).to.eq('true');
      });
    });
  
    it('redirects to the sign-in page when not authenticated', () => {
      cy.clearLocalStorage(); // Clear the session
      cy.visit('/dashboard'); // Try visiting a protected page
      cy.url().should('include', '/auth/signin'); // Should redirect to the sign-in page
    });
  });
  