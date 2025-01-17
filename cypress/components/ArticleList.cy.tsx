import React from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import ArticlesList from '../../src/pages/Articles/ArticlesList'; 
import { mount } from 'cypress/react';
import { ArticleCategory } from '../../src/services/interfaces/ArticleInterface';
import MockAuthProvider from '../mock/MockAuthProvider'; 
import { RoleUser, StatusUser } from '../../src/services/interfaces/UserInterface';

describe('Composant ArticlesList', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/article', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Article 1', category: ArticleCategory.REUNIONS },
        { id: 2, title: 'Article 2', category: ArticleCategory.TOURNOIS },
      ],
    }).as('getArticles');

    mount(
      <MemoryRouter>
        <MockAuthProvider user={{ id: 1, email:'test@test.fr', password:'Test123456', firstname: 'John', lastname: 'Doe', role: RoleUser.ADMIN, status: StatusUser.INCOMPLETE, avatar: '' }}>
          <ArticlesList />
        </MockAuthProvider>
      </MemoryRouter>
    );

    cy.wait('@getArticles');
  });

  it('doit afficher correctement le titre principal', () => {
    cy.get('h1', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Retrouvez les dernières nouvelles concernant le club !');
  });

  it('doit afficher correctement le champ de recherche', () => {
    cy.get('input[type="text"]', { timeout: 10000 })
      .should('be.visible')
      .and('have.class', 'w-full');
  });

  it('doit afficher les boutons radio de catégorie', () => {
    const categories = [ArticleCategory.TOUS, ArticleCategory.REUNIONS, ArticleCategory.TOURNOIS, ArticleCategory.EVENEMENTS, ArticleCategory.DIVERS];
    categories.forEach(category => {
      cy.contains('label', category, { timeout: 10000 }).should('be.visible');
    });
  });

  it('doit afficher les cartes d\'articles si des articles sont présents', () => {
    cy.get('a[href^="/articles/"]', { timeout: 10000 }).should('have.length', 2);
    cy.contains('a[href^="/articles/"]', 'Article 1').should('be.visible');
    cy.contains('a[href^="/articles/"]', 'Article 2').should('be.visible');
  });

  it('doit afficher les contrôles de pagination', () => {
    cy.get('.flex.items-center.gap-8', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('button').first().should('be.visible')
        .find('svg').should('have.class', 'h-4').and('have.class', 'w-4');
  
      cy.get('p').should('contain', 'Page')
        .and('contain', 'sur');
  
      cy.get('button').last().should('be.visible')
        .find('svg').should('have.class', 'h-4').and('have.class', 'w-4');
    });
  });

  it('doit afficher l\'état de chargement puis les articles', () => {
    cy.intercept('GET', 'http://localhost:3000/article', (req) => {
      req.reply((res) => {
        res.delay = 1000;
        res.send({
          statusCode: 200,
          body: [
            { id: 1, title: 'Article 1', category: ArticleCategory.REUNIONS },
            { id: 2, title: 'Article 2', category: ArticleCategory.TOURNOIS },
          ]
        });
      });
    }).as('getDelayedArticles');

    mount(
      <MemoryRouter>
        <MockAuthProvider user={{ id: 1, email:'test@test.fr', password:'Test123456', firstname: 'John', lastname: 'Doe', role: RoleUser.ADMIN, status: StatusUser.INCOMPLETE, avatar: '' }}>
        <ArticlesList />
        </MockAuthProvider>
      </MemoryRouter>
    );

    cy.contains('Chargement des articles', { timeout: 10000 }).should('be.visible');
    cy.wait('@getDelayedArticles');
    cy.contains('Chargement des articles').should('not.exist');
    cy.get('a[href^="/articles/"]', { timeout: 10000 }).should('have.length', 2);
  });
});