/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const mapaDeterminista = {
  ListaEESSPrecio: [
    {
      IDEESS: 'estacion-cara',
      'Rótulo': 'Estación cara',
      'Dirección': 'Calle Mayor 1',
      'Municipio': 'Madrid',
      'Latitud': '40,4180',
      'Longitud (WGS84)': '-3,7030',
      'Precio Gasoleo A': '1,479',
      'Precio Gasolina 95 E5': '1,689',
    },
    {
      IDEESS: 'estacion-barata',
      'Rótulo': 'Estación barata',
      'Dirección': 'Calle Atocha 2',
      'Municipio': 'Madrid',
      'Latitud': '40,4200',
      'Longitud (WGS84)': '-3,7000',
      'Precio Gasoleo A': '1,459',
      'Precio Gasolina 95 E5': '1,559',
    },
    {
      IDEESS: 'estacion-fuera-radio',
      'Rótulo': 'Estación fuera de radio',
      'Dirección': 'Avenida Lejana 99',
      'Municipio': 'Madrid',
      'Latitud': '40,4900',
      'Longitud (WGS84)': '-3,7000',
      'Precio Gasoleo A': '1,199',
      'Precio Gasolina 95 E5': '1,100',
    },
  ],
};

Given('el usuario navega al mapa con estaciones preparadas', () => {
  cy.intercept('GET', '**/EstacionesTerrestres/**', mapaDeterminista).as('getFuelPrices');

  cy.visit('/mapa', {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success) => {
        success({
          coords: {
            latitude: 40.4168,
            longitude: -3.7038,
          },
        });
      });
    },
  });

  cy.wait('@getFuelPrices');
  cy.get('img.leaflet-marker-icon').should('have.length', 3);
});

When('elige {string} en {string}', (opcion, etiqueta) => {
  cy.contains('label', etiqueta)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).select(opcion);
    });
});

When('escribe {string} en el filtro de rótulo', (texto) => {
  cy.get('#filtro-rotulo').clear().type(texto);
});

Then('debería ver solo la gasolinera más barata del mapa', () => {
  cy.get('img.leaflet-marker-icon').should('have.length', 2);
  cy.get('img.leaflet-marker-icon').eq(1).trigger('mouseover');
  cy.contains('Estación barata').should('be.visible');
});

Then('debería volver a ver todas las estaciones dentro del radio', () => {
  cy.get('img.leaflet-marker-icon').should('have.length', 3);
});

Then('debería ver solo la gasolinera {string}', (rotulo) => {
  cy.get('img.leaflet-marker-icon').should('have.length', 2);
  cy.get('img.leaflet-marker-icon').eq(1).trigger('mouseover');
  cy.contains(rotulo).should('be.visible');
});
