'use strict';

const balance = document.querySelector('.total-balance p');
const income = document.querySelector('.income p');
const expense = document.querySelector('.expense p');

const transactionContainer = document.querySelector('.transactions');
const transactionForm = document.querySelector('form');

const inputName = document.querySelector('input[type="text"]');
const inputAmount = document.querySelector('.amount input');
const inputDate = document.querySelector('input[type="date"]');

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const saveTransaction = function () {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const updateBalances = function () {
  const incomeBalance = transactions
    .filter(income => income.type === 'income')
    .reduce((total, income) => total + income.amount, 0);

  const expenseBalance = transactions
    .filter(expense => expense.type === 'expense')
    .reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = incomeBalance - expenseBalance;

  balance.textContent = `$${currencyFormatter
    .format(totalBalance)
    .substring(1)}`;
  income.textContent = currencyFormatter.format(incomeBalance);
  expense.textContent = currencyFormatter.format(expenseBalance * -1);
};

const renderTransaction = function () {
  transactionContainer.innerHTML = '';

  transactions.forEach(({ name, amount, date, type }) => {
    const sign = type === 'income' ? 1 : -1;

    const transaction = `
    <div class="transaction">
      <div class="name-amount">
        <p>${capitalize(name)}</p>
        <div class="transaction-amount ${type}">
          <p>${currencyFormatter.format(amount * sign)}</p>
        </div>
      </div>
      <span>${new Date(date).toLocaleDateString()}</span>
    </div>
    `;

    transactionContainer.insertAdjacentHTML('beforeend', transaction);
  });
};

renderTransaction();
updateBalances();

const addTransaction = function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get('name'),
    amount: +formData.get('amount'),
    date: new Date(formData.get('date')),
    type: 'on' === formData.get('type') ? 'expense' : 'income',
  });

  updateBalances();
  saveTransaction();
  renderTransaction();
};

transactionForm.addEventListener('submit', addTransaction);
