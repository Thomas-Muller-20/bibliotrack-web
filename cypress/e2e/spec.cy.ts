describe('Authentication', () => {
  it('should allow user to sign up', () => {
    cy.visit('/')

    cy.get('button').contains('Sign Up').click()
    cy.get('input[formControlName="username"]').type('newpassword')
    cy.get('input[formControlName="password"]').type('newpassword')
    cy.get('button').contains('Save').click()
    cy.url().should('include', '/home')
  })
  it('should allow user to sign in', () => {
    cy.visit('/')

    cy.get('button').contains('Sign In').click()
    cy.get('input[formControlName="username"]').type('newpassword')
    cy.get('input[formControlName="password"]').type('newpassword')
    cy.get('button').contains('Save').click()
  })

  it('should show error for invalid sign in', () => {
    cy.visit('/')
    cy.get('button').contains('Sign In').click()
    cy.get('input[formControlName="username"]').type('wronguser')
    cy.get('input[formControlName="password"]').type('wrongpassword')
    cy.get('button').contains('Save').click()
  })

  it('should show error for invalid sign up', () => {
    cy.visit('/')
    cy.get('button').contains('Sign Up').click()
    cy.get('input[formControlName="username"]').type('existinguser')
    cy.get('input[formControlName="password"]').type('newpassword')
    cy.get('button').contains('Save').click()
  })
})
