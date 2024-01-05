/// <reference types="cypress" />


describe("login form", () => {

    beforeEach(() => {
        console.log("Visiting URL:", "http://localhost:5173");
        cy.visit("http://localhost:5173");
        cy.url().should("eq", "http://127.0.0.1:5173/");
      });

      it("button is disabled", () => {
          cy.get("button").should("be.disabled");
      });
      
      it("kod yazınca buton aktif oluyor", () => {    
          cy.get('input[name="code"]').type("12345");
          cy.get("button").should("not.be.disabled");
      });
      
      it("kod hatalıyken buton pasif kalıyor (4ten kısa)", () => {
          cy.get('input[name="code"]').type("123");
          cy.get('[data-cy="terms"]').check();
          cy.get("button").should("be.disabled");
      });
      
      it("onay verilmemişken buton pasif kalıyor", () => {
          cy.get('input[name="code"]').type("123456");
          cy.get('[data-cy="terms"]').check().uncheck();
          cy.get("button").should("be.disabled");
      });
      

})