/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Coin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('button').click();
  });

  it('test invalid input autorization', () => {
    cy.get('button').contains('Выход').click();
    cy.get('#login').type('a;dgaw');
    cy.get('#password').type('gegawaw');
    cy.get('button').click();
    cy.get('.invalid-msg').should(
      'have.text',
      'Такого пользователя не существует'
    );

    cy.get('#login').clear().type('developer');
    cy.get('#password').clear().type('skillbox');
    cy.get('.invalid-msg').should('not.exist');
  });

  it('test invalid input trasfer cash between accounts', () => {
    cy.get('.my-bill__btn-open').first().click();
    cy.get('#account-recipient').type('42548741186101124315343561');
    cy.get('#amount-transfer').type('0');
    cy.get('button').contains('Отправить').click();
    cy.get('.invalid-msg').should('have.text', 'Некорректная сумма');
    cy.get('#amount-transfer').clear();
    cy.get('.invalid-msg').should('not.exist');
  });

  it('test invalid input exchange currency', () => {
    cy.get('button').contains('Валюта').click();
    cy.get('.exchange-form__input').type('0');
    cy.get('button').contains('Обменять').click();
    cy.get('.invalid-msg').should('have.text', 'Некорректная сумма');
    cy.get('.exchange-form__input').type('1');
    cy.get('.invalid-msg').should('not.exist');
  });
});
