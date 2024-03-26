describe("Logout and clearing browser storage", () => {
    it("Logs out the user and is clearing the browser storage", () => {
      cy.window().then((win) => {
        win.localStorage.setItem("token", "exampleToken");
      });
  
      cy.visit("/?view=profile&name=MartineM");
  
      cy.window().its("localStorage.token").should("equal", "exampleToken");
  
      cy.get("button#logOut").click();
  
      cy.window().its("localStorage.token").should("not.exist");
    });
  });