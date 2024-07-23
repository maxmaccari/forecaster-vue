// https://on.cypress.io/api

describe('Forecast Opening', () => {
  it('Lookup the forecast', () => {
    cy.visit('/')

    cy.get('[data-test-id="goButton"]').should('be.disabled')

    cy.get('[data-test-id="locationInput"]').type('London')
    cy.get('[data-test-id="goButton"]').should('not.be.disabled')

    cy.get('[data-test-id="goButton"]').click()

    cy.location('pathname').should('eq', '/forecast/london')
  })

  it('Ignore trailing spaces on submit', () => {
    cy.visit('/')

    cy.get('[data-test-id="locationInput"]').type('   Cuiaba  ')
    cy.get('[data-test-id="goButton"]').should('not.be.disabled')

    cy.get('[data-test-id="goButton"]').click()

    cy.location('pathname').should('eq', '/forecast/cuiaba')
  })
})
