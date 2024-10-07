![muneeyy](https://github.com/user-attachments/assets/9a39d33c-9746-4e04-9874-4d836c98ef64)

# Money Tracker Application with JavaScript

Money Tracker is an intuitive expense tracker and personal finance app designed to streamline your financial management. Effortlessly record income and expenses, categorize transactions, and track your overall financial health. Use the built-in savings calculator to set and monitor savings goals, and visualize your progress through detailed charts. This comprehensive financial tracking app helps you stay on top of your budget and spending, ensuring you're always in control of your finances.

## Where does the name Muneeyy come from?

https://github.com/user-attachments/assets/4dc5682e-0d41-41e0-bc8c-ab4683bd07da

## An explanation of where the project name come from

The project name was inspired by Kenny's line "JUS’ GIVE ME MUNEEEEYYYYYYYY" while robbing a bank in Black Mirror Season 3 Episode 3 (Shut Up and Dance).

## Features

- Adding income
- Adding expense
- Ability to see income, expense, and total balance
- Ability to see transactions even when the page is refreshed

## Overview

```javascript
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
    inputName.value = '';
    inputAmount.value = '';
    inputDate.value = '';
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
```

## Motivation

Tracking your finances with an expense tracker can significantly boost your financial health. A personal finance app helps you stay on top of your spending, saving, and budgeting by offering tools like a savings calculator to monitor progress toward your financial goals. This financial tracking app empowers you to take control by visualizing where your money goes, setting budgets, and helping you make smarter decisions. Whether it’s managing daily expenses or planning long-term savings, each action in the app fosters a sense of accomplishment and keeps you motivated to improve your financial well-being.