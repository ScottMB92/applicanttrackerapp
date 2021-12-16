/// <reference types="cypress" />

describe('Applicant Tracker Tests', () => {
  
  it('updateNameField() - Test that checks the name field functions correctly', () => {
    cy.visit('/')
    cy.get('#nameField')
    .type('Scott Boulter').should('have.value', 'Scott Boulter')
  })

  it('updateJobTitleField() - Test that checks the job title field functions correctly', () => {
    cy.visit('/')
    cy.get('#jobTitleField')
    .type('Application Support Analyst').should('have.value', 'Application Support Analyst')
  })

  it('updateBackgroundChecksField() - Test that checks the background checks field functions correctly', () => {
    cy.visit('/')
    cy.get('#backgroundChecksField')
    .type('Yes').should('have.value', 'Yes')
  })
  
  it('updateReferencesField() - Test that checks the references field functions correctly', () => {
    cy.visit('/')
    cy.get('#referencesField')
    .type('Yes').should('have.value', 'Yes')
  })

  it('crudChecks() - Test that checks a record can successfully be created, read, updated, and deleted', () => {
    cy.visit('/')
    cy.get('#nameField')
    .type('Scott Boulter').should('have.value', 'Scott Boulter')
    cy.get('#jobTitleField')
    .type('Application Support Analyst').should('have.value', 'Application Support Analyst')
    cy.get('#backgroundChecksField')
    .type('Yes').should('have.value', 'Yes')
    cy.get('#referencesField')
    .type('Yes').should('have.value', 'Yes')
    cy.get('#addApplicantButton')
    .click()
    cy.get('#updateButton')
    .click()
    cy.get('#updatedNameField')
    .type('Matthew Bellamy').should('have.value', 'Matthew Bellamy')
    cy.get('#updatedJobTitleField')
    .type('Musician').should('have.value', 'Musician')
    cy.get('#updatedBackgroundChecksField')
    .type('Yes').should('have.value', 'Yes')
    cy.get('#updatedReferencesField')
    .type('No').should('have.value', 'No')
    cy.get('#updateApplicantButton')
    .click()
    cy.get('#deleteButton')
    .click()
  })

})