describe("ReadingsPage", () => {
    beforeEach(() => {
      cy.intercept('GET', '/data/books.json', { fixture: 'books.json' }).as('getBooks');
      cy.visit("/readings");
    });
  
    it("loads books and displays them in the table", () => {
      cy.wait('@getBooks');
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });
  
    it("filters books based on search query", () => {
      cy.wait('@getBooks');
      
      // Search for a book by title
      cy.get("input[type='text']").type("The Great Gatsby");
      
      // Ensure the filtered books are displayed correctly
      cy.get("table tbody tr").should("have.length", 1);
      cy.get("table tbody tr").first().find("td").eq(0).should("contain.text", "The Great Gatsby");
    });
  
    it("filters books by selected status", () => {
      cy.wait('@getBooks');
      
      // Change the status filter to 'Read'
      cy.get("select").select("Read");
  
      // Check if the status of displayed books matches the selected filter
      cy.get("table tbody tr").each((row) => {
        cy.wrap(row).find("td").eq(3).should("contain.text", "Read");
      });
    });
  
    it("toggles book status when clicking on a status", () => {
      cy.wait('@getBooks');
      
      const firstBookRow = cy.get("table tbody tr").first();
      
      // Get the initial status of the first book
      firstBookRow.find("td").eq(3).then((statusCell) => {
        const initialStatus = statusCell.text();
  
        // Click the status to toggle it
        statusCell.click();
  
        // After clicking, the status should change
        cy.wrap(statusCell).should("not.contain.text", initialStatus);
      });
    });
  
    it("shows the correct pagination", () => {
      cy.wait('@getBooks');
      
      // Check if pagination buttons are visible
      cy.get("button").contains("Previous").should("be.visible");
      cy.get("button").contains("Next").should("be.visible");
  
      // Simulate going to the next page
      cy.get("button").contains("Next").click();
      cy.get("p").should("contain.text", "Page 2");
  
      // Check if the previous button is enabled
      cy.get("button").contains("Previous").should("not.be.disabled");
    });
  
    it("shows no books when there is no result from the filter", () => {
      cy.wait('@getBooks');
      
      // Apply a search that yields no results
      cy.get("input[type='text']").type("Nonexistent Book");
      
      // Ensure 'No books found' message is displayed
      cy.get("table tbody tr td")
        .should("contain.text", "No books found. Try adjusting your search or filter.");
    });
  });
  