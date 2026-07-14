const display = document.getElementById("display");
const historyList = document.getElementById("history");

// Calculator functions
function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    historyList.innerHTML += `<li>${display.value} = ${result}</li>`;
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// Toggle sections
function toggleHistory() {
  const historyContainer = document.getElementById("history-container");
  historyContainer.style.display =
    historyContainer.style.display === "none" ? "block" : "none";
}

function toggleCurrency() {
  const currencyContainer = document.getElementById("currency-container");
  currencyContainer.style.display =
    currencyContainer.style.display === "none" ? "block" : "none";
}

// Clear history
const clearHistoryBtn = document.getElementById("clear-history");
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});

// Currency names
const currencyNames = {
  USD: "United States Dollar 🇺🇸",
  EUR: "Euro 🇪🇺",
  GBP: "British Pound 🇬🇧",
  JPY: "Japanese Yen 🇯🇵",
  CAD: "Canadian Dollar 🇨🇦",
  AUD: "Australian Dollar 🇦🇺",
  INR: "Indian Rupee 🇮🇳",
  CNY: "Chinese Yuan 🇨🇳",
  RUB: "Russian Ruble 🇷🇺",
  NGN: "Nigerian Naira 🇳🇬",
  LYD: "Libyan Dinar 🇱🇾",
  ZAR: "South African Rand 🇿🇦",
  BRL: "Brazilian Real 🇧🇷",
  MXN: "Mexican Peso 🇲🇽",
  TRY: "Turkish Lira 🇹🇷",
  SAR: "Saudi Riyal 🇸🇦",
  AED: "UAE Dirham 🇦🇪"
};

// Load currencies
async function loadCurrencies() {
  const response = await fetch("https://api.exchangerate.host/latest");
  const data = await response.json();
  const currencies = Object.keys(data.rates);

  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  currencies.forEach(currency => {
    const name = currencyNames[currency] || currency;
    fromSelect.innerHTML += `<option value="${currency}">${name}</option>`;
    toSelect.innerHTML += `<option value="${currency}">${name}</option>`;
  });

  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

// Convert currency
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  const response = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
  const data = await response.json();

  document.getElementById("conversionResult").innerText =
    `${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`;
}

loadCurrencies();
