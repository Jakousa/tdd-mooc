describe('Application', () => {
  it('frontend loads', () => {
      cy.visit('http://localhost:8080')
      cy.contains("Hello from frontend")
  })

  it('backend loads', () => {
    cy.visit('http://localhost:8080/api')
    cy.contains("Hello from backend")
  })
})