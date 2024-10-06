'use strict';

const totalBalance = document.querySelector('.total-balance p');
const income = document.querySelector('.income p');
const expense = document.querySelector('.expense p');

const transactionContainer = document.querySelector('.transactions');
const transactionForm = document.querySelector('form');

const inputName = document.querySelector('input[type="text"]');
const inputAmount = document.querySelector('.amount input');
const inputDate = document.querySelector('input[type="date"]');

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const transactions = [];
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const renderTransaction = function () {
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

const addTransaction = function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get('name'),
    amount: formData.get('amount'),
    date: new Date(formData.get('date')),
    type: 'on' === formData.get('type') ? 'expense' : 'income',
  });

  renderTransaction();
};

transactionForm.addEventListener('submit', addTransaction);
