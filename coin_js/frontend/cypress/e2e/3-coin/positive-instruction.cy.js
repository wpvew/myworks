/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Coin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('button').click();
  });

  it('page login', () => {
    cy.get('main').should('have.class', 'page-accounts');
    cy.get('button').contains('Счета').should('have.attr', 'disabled');
  });

  it('create new account', () => {
    cy.get('.accounts__item')
      .its('length')
      .then((lengthBeforeClick) => {
        cy.get('button').contains('Создать новый счёт').click();
        cy.get('.accounts__item').should('have.length', lengthBeforeClick + 1);
      });
    cy.get('.accounts__item').last().contains('Открыть').click();
    cy.get('main').should('have.class', 'page-account-details');
  });

  it('check page account', () => {
    const amountTransfer = 10.41;
    cy.get('.my-bill__btn-open').first().click();
    cy.get('main').should('have.class', 'page-account-details');
    cy.get('#account-recipient').type('42548741186101124315343561');
    cy.get('#amount-transfer').type(amountTransfer);
    cy.get('button').contains('Отправить').click();
    cy.get('#account-recipient').should('have.value', '');
    cy.get('#amount-transfer').should('have.value', '');
    cy.get('.transfer__outgoing')
      .first()
      .should('contain.text', amountTransfer);
  });

  it('check page currency', () => {
    cy.get('button').contains('Валюта').click();
    cy.get('main').should('have.class', 'page-currency');
    cy.get('.choices__inner').first().click();
    cy.get('[data-value="RUB"]').first().click();
    cy.get('.choices__inner').last().click();
    cy.get('[data-value="CAD"]').last().click();
    cy.get('input').type('10');
    cy.get('button').contains('Обменять').click();
    cy.get('.currency-exchange').should('have.class', 'success');
  });

  it('check page bank map', () => {
    cy.get('button').contains('Банкоматы').click();
    cy.get('main').should('have.class', 'page-banks');
  });
});
