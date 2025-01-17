import React from 'react';
import Contact from '../../src/pages/StaticPages/Contact'; 
import { mount } from 'cypress/react';

describe('Contact Component', () => {
  beforeEach(() => {
    mount(<Contact />);
  });

  it('should render the main title correctly', () => {
    cy.get('h1')
      .should('contain', 'Un conseil ? Un renseignement ?')
      .and('contain', 'Contactez-nous !');
  });

  it('should display the PistasPhoto image', () => {
    cy.get('img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'Pistas.png');
  });

  it('should render the correct contact information', () => {
    cy.get('p').eq(0).should('contain', '03 44 77 09 33');
    cy.get('p').eq(1).should('contain', 'secretariat.agnetz-tennis@hotmail.com');
    cy.get('p').eq(2).should('contain', 'Rue Joseph Van Lancker 60600 AGNETZ');
    cy.get('p').eq(3).should('contain', 'Permanences :');
    cy.get('p').eq(3).should('contain', 'Mercredi et samedi 15h00-18h00');
    cy.get('p').eq(3).should('contain', 'dimanche 9h00-12h00');  });

  it('should have the correct CSS classes for responsiveness', () => {
    cy.get('h1')
      .should('have.class', 'sm:text-5xl')
      .and('have.class', 'text-2xl');

    cy.get('.flex.flex-col.lg\\:flex-row-reverse')
      .should('have.class', 'lg:gap-x-36');
  });
});