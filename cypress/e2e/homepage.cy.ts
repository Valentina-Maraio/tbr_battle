describe('HomePage', () => {
    beforeEach(() => {
      // Mock the user authentication and open the page
<<<<<<< HEAD
      cy.visit('/src/app/homepage'); // Visit the homepage (or any other appropriate route)
=======
      cy.visit('/'); // Visit the homepage (or any other appropriate route)
>>>>>>> e1efacb (cypress test)
    });
  
    it('displays the sidebar correctly', () => {
      // Verify the sidebar is visible
      cy.get('nav').should('exist');
      cy.get('nav').should('have.class', 'lg:relative'); // Ensure sidebar class is present
  
      // Check that the sidebar has the correct links
      cy.get('a[href="/dashboard"]').should('exist').and('contain.text', 'Dashboard');
      cy.get('a[href="/readings"]').should('exist').and('contain.text', 'Readings');
      cy.get('a[href="/shared_books"]').should('exist').and('contain.text', 'Shared');
    });
  
    it('opens and closes the sidebar on mobile', () => {
      // Simulate clicking the mobile menu button
      cy.get('button[aria-label="Toggle Sidebar"]').click();
  
      // Verify the sidebar is visible after clicking the mobile menu button
      cy.get('nav').should('have.class', 'translate-x-0');
  
      // Close the sidebar by clicking on a link inside the sidebar
      cy.get('a[href="/dashboard"]').click();
      cy.get('nav').should('have.class', '-translate-x-full'); // Sidebar should close
    });
  
    it('opens the modal when clicking the settings button', () => {
      // Click on the settings button
      cy.get('button').contains('Settings').click();
  
      // Verify the modal is open
      cy.get('.fixed').should('exist'); // Modal should appear
      cy.get('h2').should('contain.text', 'User Information'); // Check modal title
  
      // Verify the user information is displayed
      cy.get('p').contains('Name: John');
      cy.get('p').contains('Surname: Doe');
      cy.get('p').contains('Email: john.doe@example.com');
    });
  
    it('closes the modal when clicking the close button', () => {
      // Open the modal first
      cy.get('button').contains('Settings').click();
  
      // Close the modal by clicking the close button
      cy.get('button').contains('Close').click();
  
      // Verify the modal is closed
      cy.get('.fixed').should('not.exist');
    });
  
    it('logs the user out when clicking the logout button', () => {
      // Open the modal first
      cy.get('button').contains('Settings').click();
  
      // Click on the logout button
      cy.get('button').contains('Logout').click();
  
      // Verify the user is logged out by checking the redirection
      cy.url().should('eq', 'http://localhost:3000/'); // Assuming home page is the redirect after logout
    });
  
    it('changes theme when selecting a different theme', () => {
      // Open the theme selector
      cy.get('select').should('exist');
  
      // Change the theme to dark
      cy.get('select').select('dark');
      cy.get('select').should('have.value', 'dark');
  
      // Verify that the page theme has changed (example check for dark mode background)
      cy.get('body').should('have.css', 'background-color').and('eq', 'rgb(0, 0, 0)'); // Assuming dark mode background color
  
      // Change the theme to light
      cy.get('select').select('light');
      cy.get('select').should('have.value', 'light');
  
      // Verify the background color is light
      cy.get('body').should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)'); // Assuming light mode background color
    });
  
    it('toggles modal visibility when the user clicks settings icon', () => {
      // Initially, modal should not be visible
      cy.get('.fixed').should('not.exist');
  
      // Open the modal by clicking the settings button
      cy.get('button').contains('Settings').click();
  
      // Verify the modal is open
      cy.get('.fixed').should('exist');
  
      // Close the modal
      cy.get('button').contains('Close').click();
  
      // Verify the modal is closed again
      cy.get('.fixed').should('not.exist');
    });
  });
  