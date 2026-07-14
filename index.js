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
