'use strict';

const totalBalance = document.querySelector('.total-balance p');
const income = document.querySelector('.income p');
const expense = document.querySelector('.expense p');

const transactionContainer = document.querySelector('.transactions');
const transactionForm = document.querySelector('form');
const transactionName = document.querySelector('.transaction p:nth-child(1)');
const transactionAmount = document.querySelector('.transaction p:nth-child(2)');
const transactionDate = document.querySelector('span');

const inputName = document.querySelector('input[type="text"]');
const inputAmount = document.querySelector('.amount input');
const inputDate = document.querySelector('input[type="date"]');

const btnIncome = document.querySelector('.btn-income');
const btnExpense = document.querySelector('.btn-expense');

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const renderTransaction = function (e) {
  e.preventDefault();

  const name = inputName.value;
  const amount = +inputAmount.value;
  const currFormat = currencyFormatter.format(+inputAmount.value);
  const date = new Date(inputDate.value).toLocaleDateString();

  const transaction = `
    <div class="transaction">
      <div class="name-amount">
        <p>${capitalize(name)}</p>
        <p>${amount < 0 ? '' : '+'}${currFormat}</p>
      </div>
      <span>${date}</span>
    </div>
    `;

  transactionContainer.insertAdjacentHTML('beforeend', transaction);
  inputName.value = '';
  inputAmount.value = '';
  inputDate.value = '';
};

transactionForm.addEventListener('submit', renderTransaction);
