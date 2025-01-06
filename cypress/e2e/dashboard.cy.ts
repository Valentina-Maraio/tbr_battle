describe('Dashboard Component', () => {
    beforeEach(() => {
      // Mock the data loading for books
      cy.intercept('GET', '/data/books.json', { fixture: 'books.json' }).as('getBooksData');
      cy.visit('/dashboard');  // Replace with your actual route if needed
    });
  
    it('renders the dashboard with correct charts and content', () => {
      // Ensure that the dashboard elements are present
      cy.get('h1').should('contain.text', 'Welcome to the TBR Battle Dashboard!');
      cy.get('.bg-gray-200').should('have.length', 4);  // Four sections: Books by Publisher, Top Authors, etc.
  
      // Check if the books by publisher chart exists
      cy.get('h2').contains('Books by Publisher').should('exist');
      cy.get('.books-by-publisher-chart').should('exist'); // Assuming this is the class of your chart component
  
      // Check if the top authors chart exists
      cy.get('h2').contains('Top 10 Most Read/Added Authors').should('exist');
      cy.get('.top-authors-chart').should('exist'); // Assuming this is the class of your chart component
  
      // Check if the books per year chart exists
      cy.get('.books-per-year-chart').should('exist'); // Assuming this is the class of your chart component
  
      // Ensure content related to the chart descriptions is visible
      cy.get('p').contains('This chart visualizes the distribution of books across different publishers').should('exist');
      cy.get('p').contains('The "Top 10 Most Read/Added Authors" chart highlights the most popular authors').should('exist');
      cy.get('p').contains('This chart provides a timeline of book publications over the years').should('exist');
    });
  
    it('loads the books data correctly from JSON', () => {
      cy.wait('@getBooksData'); // Wait for the intercept to complete
      cy.get('.bg-gray-200').should('exist');  // Ensure elements exist after loading data
      cy.get('.books-by-publisher-chart').should('have.length', 1); // Check that the chart loaded data
    });
  
    it('handles error loading books data gracefully', () => {
      // Simulate a failed response for books.json
      cy.intercept('GET', '/data/books.json', {
        statusCode: 500,
        body: { error: 'Failed to load books data' },
      }).as('getBooksDataError');
  
      cy.visit('/dashboard');  // Visit the dashboard again to simulate error state
  
      // Ensure an error message is shown, this would depend on your error handling
      cy.wait('@getBooksDataError');
      cy.get('.error-message').should('contain.text', 'Error loading books data');
    });
  });
  