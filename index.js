const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const initialIncome = document.getElementById("incomeValue");
const initialExpense = document.getElementById("expenseValue");
const initialBalance = document.getElementById("balanceValue");
const tbody = document.getElementById("table");
const incomeInput = document.getElementById("income");
const expenseInput = document.getElementById("expense");
const categoryInput = document.getElementById("categoryText");

let income = 0;
let expense = 0;
let balance = 0;

addBtn.addEventListener("click", function () {
  const incomeValue = parseFloat(incomeInput.value) || 0;
  const expenseValue = parseFloat(expenseInput.value) || 0;
  const category = categoryInput.value.trim();
  const now = new Date().toLocaleTimeString();

  if (!category || (incomeValue <= 0 && expenseValue <= 0)) {
    alert("Enter category and valid income or expense");
    return;
  }
  const result = incomeValue - expenseValue;
  income += incomeValue;
  expense += expenseValue;
  balance += result;
  initialIncome.innerText = income;
  initialExpense.innerText = expense;
  initialBalance.innerText = balance;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="border px-3 py-2 font-bold ${
      result >= 0 ? "text-green-600" : "text-red-600"
    }">${result >= 0 ? "+" + result : result}</td>
    <td class="border px-3 py-2">${category}</td>
    <td class="border px-3 py-2">${now}</td>
    <td class="border px-3 py-2">
      <button class="btn btn-xs btn-outline delete-btn">Delete</button>
    </td>
  `;
  const rowIncome = incomeValue;
  const rowExpense = expenseValue;
  const rowProfitLoss = result;
  tbody.appendChild(row);
  row.querySelector(".delete-btn").addEventListener("click", function () {
    income -= rowIncome;
    expense -= rowExpense;
    balance -= rowProfitLoss;
    initialIncome.innerText = income;
    initialExpense.innerText = expense;
    initialBalance.innerText = balance;
    row.remove();
  });
  incomeInput.value = "";
  expenseInput.value = "";
  categoryInput.value = "";
});

resetBtn.addEventListener("click", function () {
  income = 0;
  expense = 0;
  balance = 0;
  initialIncome.innerText = income;
  initialExpense.innerText = expense;
  initialBalance.innerText = balance;
  tbody.innerHTML = "";
  incomeInput.value = "";
  expenseInput.value = "";
  categoryInput.value = "";
});
