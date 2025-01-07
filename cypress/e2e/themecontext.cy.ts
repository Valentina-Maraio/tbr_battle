describe('ThemeProvider', () => {
    beforeEach(() => {
      // Clear localStorage before each test to ensure a clean state
      localStorage.clear();
      cy.visit('/');
    });
  
    it('should load with the default light theme', () => {
      // Check if the body has the 'theme-light' class
      cy.window().then((win) => {
        expect(win.document.body.className).to.include('theme-light');
      });
      // Check if the current theme is light in the UI (assuming theme is displayed in the app)
      cy.get('p').contains('Current theme: light').should('be.visible');
    });
  
    it('should load the theme from localStorage if available', () => {
      // Set a dark theme in localStorage
      localStorage.setItem('theme', 'dark');
      cy.visit('/'); // Reload the page to apply the saved theme
  
      // Check if the body has the 'theme-dark' class
      cy.window().then((win) => {
        expect(win.document.body.className).to.include('theme-dark');
      });
  
      // Check if the current theme is dark in the UI
      cy.get('p').contains('Current theme: dark').should('be.visible');
    });
  
    it('should change the theme and update localStorage and body class', () => {
      // Initially, the theme should be light
      cy.get('p').contains('Current theme: light').should('be.visible');
      
      // Click the button to switch to dark theme
      cy.contains('Switch to Dark Theme').click();
  
      // Check if the theme is now dark
      cy.get('p').contains('Current theme: dark').should('be.visible');
      
      // Check if the body has the 'theme-dark' class
      cy.window().then((win) => {
        expect(win.document.body.className).to.include('theme-dark');
      });
  
      // Verify that the theme is saved in localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('theme')).to.eq('dark');
      });
    });
  
    it('should switch to middle theme and update localStorage and body class', () => {
      // Initially, the theme should be light
      cy.get('p').contains('Current theme: light').should('be.visible');
  
      // Click the button to switch to middle theme
      cy.contains('Switch to Middle Theme').click();
  
      // Check if the theme is now middle
      cy.get('p').contains('Current theme: middle').should('be.visible');
  
      // Check if the body has the 'theme-middle' class
      cy.window().then((win) => {
        expect(win.document.body.className).to.include('theme-middle');
      });
  
      // Verify that the theme is saved in localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('theme')).to.eq('middle');
      });
    });
  });
  