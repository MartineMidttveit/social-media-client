describe("User login", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(1000);
  });

  context("Valid user credentials", () => {
    it("Successfully logs in", () => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.wait(700);

      cy.get("#loginForm").within(() => {
        cy.get('input[name="email"]').type("julius1234@noroff.no");
        cy.get('input[name="password"]').type("julius123");
        cy.get('button[type="submit"]').click();
      });

      cy.wait(1500);
      cy.url().should("include", "view=profile");
    });

    it("Stores token in LocalStorage", () => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.wait(700);

      cy.get("#loginForm").within(() => {
        cy.get('input[name="email"]').type("julius1234@noroff.no");
        cy.get('input[name="password"]').type("julius123");
        cy.get('button[type="submit"]').click();
      });

      cy.wait(1500);
      cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.exist;
      });
    });
  });

  context("Invalid user credentials", () => {
    it("Fails to log in", () => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.wait(700);

      cy.get("#loginForm").within(() => {
        cy.get('input[name="email"]').type("invalid@email.com");
        cy.get('input[name="password"]').type("invalidpassword");
        cy.get('button[type="submit"]').click();
      });

      cy.wait(1500);
      cy.on("window:alert", (text) => {
        expect(text).to.contain(
          "Either your username was not found or your password is incorrect",
        );
      });
    });

    it("Does not store token in LocalStorage", () => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.wait(700);

      cy.get("#loginForm").within(() => {
        cy.get('input[name="email"]').type("invalid@email.com");
        cy.get('input[name="password"]').type("invalidpassword");
        cy.get('button[type="submit"]').click();
      });
      cy.wait(1500);
      cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
      });
    });
  });
});
