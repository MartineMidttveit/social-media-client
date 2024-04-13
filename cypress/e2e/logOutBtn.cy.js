describe("Logout and clearing browser storage", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(1000);
  });

  it("Logs out the user and clears token from localStorage", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.wait(700);

    cy.get("#loginForm").within(() => {
      cy.get('input[name="email"]').type("julius1234@noroff.no");
      cy.get('input[name="password"]').type("julius123");
      cy.get('button[type="submit"]').click();
    });
    cy.wait(1500);

    cy.window().its("localStorage.token").should("exist");
    cy.get('button[data-auth="logout"]').click();
    cy.wait(1500);
    cy.window().its("localStorage.token").should("not.exist");
  });

  it("After logout user gets redirected to register/login page", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.wait(700);

    cy.get("#loginForm").within(() => {
      cy.get('input[name="email"]').type("julius1234@noroff.no");
      cy.get('input[name="password"]').type("julius123");
      cy.get('button[type="submit"]').click();
    });
    cy.wait(1500);

    cy.get('button[data-auth="logout"]').click();
    cy.wait(1500);
    cy.url().should("eq", "http://127.0.0.1:5500/");
  });
});
