describe("EventForm", () => {
  it("submits a new event", () => {
    cy.visit("localhost:3000");
    cy.findByRole("input", { name: /firstname/i }).type("john");
    cy.findByRole("input", {
      name: /lastname/i,
    }).type("doe");
    cy.findByRole("input", {
      name: /email/i,
    }).type("test@test.com");
    cy.findByRole("textbox").click();
    cy.findByRole("option", {
      name: /choose saturday, august 6th, 2022/i,
    }).click();
    cy.findByRole("button", { name: /submit/i }).click();
  });
});
