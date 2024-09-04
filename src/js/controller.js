'use strict';

const totalBalance = document.querySelector('.total-balance p');
const income = document.querySelector('.income p');
const expense = document.querySelector('.expense p');

const transactionContainer = document.querySelector('.transactions');
const transactionName = document.querySelector('.transaction p:nth-child(1)');
const transactionAmount = document.querySelector('.transaction p:nth-child(2)');
const transactionDate = document.querySelector('span');

const inputName = document.querySelector('input[type="text"]');
const inputAmount = document.querySelector('input[type="number"]');
const inputDate = document.querySelector('input[type="date"]');

const btnIncome = document.querySelector('.btn-income');
const btnExpense = document.querySelector('.btn-expense');
const btnSubmit = document.querySelector('button[type="submit"]');
