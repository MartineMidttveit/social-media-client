describe('Login Form Validation', () => {
    it('Displays alert for invalid credentials', () => {
      cy.visit('http://127.0.0.1:5500'); 
  
      cy.get('[data-auth="login"][data-bs-target="#loginModal"]').first().click();
  
      cy.get('#loginEmail').type('invalid_email@example.com');
      cy.get('#loginPassword').type('invalid_password');
  
      cy.on('window:alert', (text) => {
        expect(text).to.contain('Either your username was not found or your password is incorrect');
      });
  
      cy.get('#loginForm').submit();
    });
  
    it('Successfully logs in with valid credentials', () => {
      cy.visit('http://127.0.0.1:5500'); 
  
      cy.get('[data-auth="login"][data-bs-target="#loginModal"]').first().click();
  
      cy.get('#loginEmail').type('valid_email@example.no');
      cy.get('#loginPassword').type('valid_password@example.no');
  
      cy.get('#loginForm').submit();

      cy.get("#logOut").should("exist");
    });
  });