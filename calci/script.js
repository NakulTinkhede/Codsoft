let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || key === '.' || ['+', '-', '*', '/', '%'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});


document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});


function appendValue(value) {
  const operators = ['+', '-', '*', '/', '%'];
  const lastChar = display.value.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) {
    return; // Don't allow two operators in a row
  }

  display.value += value;
}


function calculate() {
  try {
    const result = eval(display.value);
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  const ul = document.getElementById("history-list");
  const li = document.createElement("li");
  li.textContent = entry;
  ul.prepend(li); // Add to top
}


function setWallpaper(theme) {
  document.body.style.backgroundImage = `url('wallpapers/${theme}.jpg')`;
  localStorage.setItem("wallpaper", theme); // store user preference
}

// Load saved wallpaper on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("wallpaper");
  if (savedTheme) {
    setWallpaper(savedTheme);
  }
});
