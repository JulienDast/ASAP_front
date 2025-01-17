import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../../src/pages/Auth/SignIn'; 
import { mount } from 'cypress/react';


describe('SignIn Page - Input Tests', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  it('should render the sign-in form with correct elements', () => {
    cy.get('h1').should('contain', 'Bienvenue sur ASAP');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Connexion');
  });

  it('should update email input when typed', () => {
    const testEmail = 'test@example.com';
    cy.get('input[name="email"]')
      .type(testEmail)
      .should('have.value', testEmail);
  });

  it('should update password input when typed', () => {
    const testPassword = 'password123';
    cy.get('input[name="password"]')
      .type(testPassword)
      .should('have.value', testPassword);
  });

  it('should show password in plain text when type is changed', () => {
    const testPassword = 'password123';
    cy.get('input[name="password"]')
      .type(testPassword)
      .should('have.attr', 'type', 'password');
  });

  it('should have required attribute on both inputs', () => {
    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="password"]').should('have.attr', 'required');
  });

  it('should have correct label for email input', () => {
    cy.get('label').contains('Email').should('exist');
  });

  it('should have correct label for password input', () => {
    cy.get('label').contains('Mot de passe').should('exist');
  });

  it('should have a link to forgot password page', () => {
    cy.get('a[href="/signin/forgot-password"]')
      .should('exist')
      .within(() => {
        cy.get('p').should('contain', 'Mot de passe oublié ?');
      });
  });

  it('should have a button to signup page', () => {
    cy.get('button').contains('Pas encore inscrit ?').should('exist');
  });
});