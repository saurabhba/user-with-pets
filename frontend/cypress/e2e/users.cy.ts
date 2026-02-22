describe("Users & Their Dogs", () => {
  const apiRoute = "**/api/users-with-pet*";

  it("loads users on first visit", () => {
    cy.fixture("users.json").then(({ defaultUsers }) => {
      cy.intercept("GET", "**/api/users-with-pet?count=5", {
        statusCode: 200,
        body: defaultUsers,
      }).as("getUsers");
    });

    cy.visit("/");
    cy.wait("@getUsers");

    cy.contains("h1", "Users & Their Dogs").should("be.visible");
    cy.get('section[aria-label="Users with their dogs"] .rounded-2xl')
      .should("have.length", 3)
      .first()
      .within(() => {
        cy.contains("John Doe").should("exist");
      });
  });

  it("refetches with new filters", () => {
    cy.fixture("users.json").then(({ defaultUsers, frenchUsers }) => {
      cy.intercept("GET", "**/api/users-with-pet?count=5", {
        statusCode: 200,
        body: defaultUsers,
      }).as("getUsers");
      cy.intercept("GET", "**/api/users-with-pet?count=2&nat=FR", {
        statusCode: 200,
        body: frenchUsers,
      }).as("getFrenchUsers");
    });

    cy.visit("/");
    cy.wait("@getUsers");

    cy.get("#nationality").select("FR");
    cy.get("#count").clear().type("2");
    cy.contains("button", "Fetch Users").click();

    cy.wait("@getFrenchUsers")
      .its("request.url")
      .should("contain", "nat=FR");

    cy.get('section[aria-label="Users with their dogs"] .rounded-2xl')
      .should("have.length", 2)
      .first()
      .within(() => {
        cy.contains("Camille Dubois").should("exist");
      });
  });

  it("shows validation error when count is out of range", () => {
    cy.fixture("users.json").then(({ defaultUsers }) => {
      cy.intercept("GET", apiRoute, {
        statusCode: 200,
        body: defaultUsers,
      }).as("getUsers");
    });

    cy.visit("/");
    cy.wait("@getUsers");

    cy.get("#count").clear().type("0");
    cy.contains("button", "Fetch Users").click();

    cy.contains("Number of users must be between 1 and 50.").should(
      "be.visible",
    );
  });

  it("surfaces API failures to the user", () => {
    cy.intercept("GET", apiRoute, {
      statusCode: 500,
      body: {},
    }).as("getUsersError");

    cy.visit("/");
    cy.wait("@getUsersError");

    cy.contains("Request failed with status 500").should("be.visible");
    cy.get('section[aria-label="Users with their dogs"]')
      .should("not.exist");
  });
});
