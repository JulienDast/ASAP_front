import React from 'react';
import Home from '../../src/pages/StaticPages/Home'; 
import { mount } from 'cypress/react';


describe('Home Component', () => {
  beforeEach(() => {
    mount(<Home />);
  });

  it('should render the main title correctly', () => {
    cy.get('h1')
      .should('contain', 'Bienvenue sur ASAP')
  });

  it('should display the GifPadel image', () => {
    cy.get('img[alt="joueur_padel_animated"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'GifPadel');
  });

  it('should render the correct paragraphs', () => {
    cy.get('p').first().should('contain', 'Le padel est un sport captivant et amusant');
    cy.get('p').last().should('contain', 'Rejoignez-nous à Agnetz pour relever le défi');
  });

  it('should have the correct CSS classes for responsiveness', () => {
    cy.get('h1')
      .should('have.class', 'sm:text-5xl')
      .and('have.class', 'text-2xl');
    
    cy.get('.flex.flex-col.lg\\:flex-row')
      .should('have.class', 'lg:gap-x-36');
  });
});