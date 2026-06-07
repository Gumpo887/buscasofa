/// <reference types="cypress" />
/* global describe, beforeEach, it, cy, expect */
// Pruebas de la pagina de informacion de la aplicacion

describe('Visualizacion de la pagina de informacion de la aplicacion', () => {
    const expectedImages = [
        '/team/casandra.png',
        '/team/jose.jpg',
        '/team/jesusmartinez.png',
        '/team/jesuscastaner.png',
    ];
    
    beforeEach(() => {
        cy.visit('/about');
    });

    it('El usuario ve un enlace a la pagina de informacion', () => {
        cy.get('nav a.about')
            .should('exist')
            .should('have.attr', 'href', '/about')
            .contains('Quienes somos')
            .click();
        cy.url().should('include', '/about');
    });

    it('La seccion tiene cards', () => {
        cy.get('.card')
            .should('exist')
    });

    it('Todas las cards tienen un nombre de miembro del equipo', () => {
        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.member-name').should('exist'); 
        });
    });

    it('Todas las cards tienen una descripcion del miembro del equipo', () => {
        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.member-description').should('exist'); 
        });
    });

    it('Todas las cards tienen una imagen de perfil accesible y cargada', () => {
        cy.get('.card').each(($card, index) => {
            cy.wrap($card)
                .find('.member-image')
                .should('be.visible')
                .and('have.attr', 'alt')
                .and('not.be.empty');

            cy.wrap($card)
                .find('.member-image')
                .should('have.attr', 'src', expectedImages[index]);

            cy.wrap($card)
                .find('.member-image')
                .should(($img) => {
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                });
        });
    });

    it('Una de las cards tiene el nombre "Casandra Carolina Iglesias Martinez"', () => {
        cy.get('.card')
            .contains('.member-name', 'Casandra Carolina Iglesias Martínez')
            .should('exist');
    });

    it('Tenemos al menos cuatro cards con los miembros del equipo', () => {
        cy.get('.card').should('have.length.at.least', 4);
    });

    it('Existe una seccion con el numero de equipo', () => {
        cy.get('.team-number')
            .should('exist')
   
    });

    it('La seccion del numero de equipo muestra el numero 13', () => {
        cy.get('.team-number')
            .should('contain.text', '13');
    });

});
