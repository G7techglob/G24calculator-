const display = document.getElementById("display");
const historyList = document.getElementById("history");
const toggleThemeBtn = document.getElementById("toggle-theme");

function appendValue(value) {
  display.value += value;
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

// Dark mode toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
const clearHistoryBtn = document.getElementById("clear-history");

clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});

async function loadCurrencies() {
  const response = await fetch("https://api.exchangerate.host/latest");
  const data = await response.json();
  const currencies = Object.keys(data.rates);

  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  currencies.forEach(currency => {
    fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
    toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

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
