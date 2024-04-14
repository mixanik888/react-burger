
describe("test a burger", () => {
  beforeEach(() => {
    cy.viewport(1920, 1024);
    cy.visit("/");
    cy.intercept("GET", "api/ingredients", { fixture: "data.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it("should open constructor page by default", () => {
    cy.contains("Соберите бургер");
  });

  it("should open ingredient details", () => {
    cy.visit("/");
    cy.contains('Тестовая булка').parent().as('bun');
    cy.get("@bun").click();

    cy.contains("Детали ингредиента");
    cy.get('[data-testId="modalOverlay"]').click({ force: true });
  
  });

  it("should dragDrop bun", () => {
    cy.get("[class^=Ingredient_ingredient]").first().as("bun");
    cy.get("@bun").trigger("dragstart");

    cy.get("[class^=BurgerConstructor_top]").as("Constructor");
    cy.get("@Constructor").trigger("drop");

    cy.get("[class^=Ingredient_ingredient]").eq(1).trigger("dragstart");
    cy.get("@Constructor").trigger("drop");

    cy.get("[class^=PriceCount_count]").find("p").should("have.text", "2710");

    cy.get('[data-testId="buttonBay"]').click();

    cy.get("[class^=OrderDetails_order]").find("h2").should("have.text", "123");
    cy.get("[class^=Modal_icon]").click();

    cy.get("[class^=PriceCount_count]").find("p").should("have.text", "0");
  });

});
