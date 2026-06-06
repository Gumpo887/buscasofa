/// <reference types="cypress" />
// Pruebas de la página de información de la aplicación

describe('Visualización de la página de información de la aplicación', () => {
    
    beforeEach(() => {
        cy.visit('/about');
    });

    it('El usuario ve un enlace a la página de información', () => {
        cy.get('nav a.about')
            .should('exist')
            .should('have.attr', 'href', '/about')
            .contains('Quienes somos')
            .click();
        cy.url().should('include', '/about');   // hemos navegado a la página correctamente
    });

    it('La sección tiene cards', () => {
        cy.get('.card')
            .should('exist')
    });

    it('Todas las cards tienen un nombre de miembro del equipo', () => {
        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.member-name').should('exist'); 
        });
    });

    it('Todas las cards tienen una descripción del miembro del equipo', () => {
        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.member-description').should('exist'); 
        });
    });

    it('Una de las cards tiene el nombre "Casandra Carolina Iglesias Martínez"', () => {
        cy.get('.card')
            .contains('.member-name', 'Casandra Carolina Iglesias Martínez')
            .should('exist');
    });

    it('Tenemos al menos cuatro cards con los miembros del equipo', () => {
        cy.get('.card').should('have.length.at.least', 4);
    });

    it('Existe una sección con el número de equipo', () => {
        cy.get('.team-number')
            .should('exist')
   
    });

    it('La sección del número de equipo muestra el número 4', () => {
        cy.get('.team-number')
            .should('contain.text', '13');
    });

});
