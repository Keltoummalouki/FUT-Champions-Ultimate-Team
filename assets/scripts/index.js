const themeSwitcher = document.getElementById("theme-switcher");
const body = document.body;

if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
}

body.className = localStorage.getItem("theme");

themeSwitcher.addEventListener("click", () => {
    const currentTheme = body.className;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    themeSwitcher.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

const rangeInput = document.querySelector('input[type="range"]');
const rangeValue = document.querySelector('.range-value');



const popup = document.querySelector('.form-popup');
const closeBtn = document.querySelector('.close-btn');

function openPopup() {
   
    popup.classList.add('active');
    console.log(popup)
    document.body.classList.add('popup-active');
}
closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    document.body.classList.remove('popup-active');
});