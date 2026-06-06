/// <reference types="cypress" />
// Pruebas del footer de la aplicación

describe('Visualización del footer de la aplicación', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('El usuario ve los miembros del equipo de desarrollo', () => {
        cy.contains('Miembros del equipo:').should('exist');
        cy.contains('Casandra Carolina Iglesias Martínez').should('exist');
        cy.contains('Jose Luis García Pelayo').should('exist');
        cy.contains('Jesús Martínez Alonso').should('exist');
        cy.contains('Jesús Castañer Moreno').should('exist');
    });
});
