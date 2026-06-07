/// <reference types="Cypress" />
/* global describe, it, cy */
import About from '../../src/components/About'

describe('<About />', () => {
  const expectedImages = [
    '/team/casandra.png',
    '/team/jose.jpg',
    '/team/jesusmartinez.png',
    '/team/jesuscastaner.png',
  ]

  it('renders team member cards with accessible profile images', () => {
    cy.mount(<About />)

    cy.get('h1').should('contain', 'Quienes somos')
    cy.get('#info').should('contain', 'Somos el Equipo 13')
    cy.get('.card').should('have.length.at.least', 4)

    cy.get('.card').each(($card, index) => {
      cy.wrap($card).find('.member-name').should('exist')
      cy.wrap($card).find('.member-description').should('exist')
      cy.wrap($card)
        .find('.member-image')
        .should('be.visible')
        .and('have.attr', 'src', expectedImages[index])
      cy.wrap($card)
        .find('.member-image')
        .should('have.attr', 'alt')
        .and('not.be.empty')
    })
  })
})
