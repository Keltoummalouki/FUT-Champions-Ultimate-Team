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

function validateForm() {

    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';
    const errors = [];

    const name = document.getElementById('name').value.trim();
    if (!name) {
        errors.push('Name is required.');
    }

    const position = document.getElementById('position').value;
    const nationality = document.getElementById('nationality').value;
    const club = document.getElementById('club').value;
    if (!position) errors.push('Please select a position.');
    if (!nationality) errors.push('Please select a nationality.');
    if (!club) errors.push('Please select a club.');

    const numericFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    numericFields.forEach((field) => {
        const value = document.getElementById(field).value;
        if (!value || value < 1 || value > 99) {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} must be between 1 and 99.`);
        }
    });

    const photo = document.querySelector('.upload-img-photo input[type="file"]').files.length;
    const flag = document.querySelector('.upload-img-flag input[type="file"]').files.length;
    const logo = document.querySelector('.upload-img-logo input[type="file"]').files.length;
    if (!photo) errors.push('Player photo is required.');
    if (!flag) errors.push('Nationality flag is required.');
    if (!logo) errors.push('Club logo is required.');

    if (errors.length > 0) {
        errors.forEach((error) => {
            const errorItem = document.createElement('p');
            errorItem.textContent = error;
            errorItem.style.color = 'red';
            errorMessages.appendChild(errorItem);
        });
        return false;
    }

    alert('Player added successfully!');
    return true;
}

function updateIcon(inputElement, iconId) {
    const icon = document.getElementById(iconId);
    if (inputElement.files && inputElement.files.length > 0) {
        icon.textContent = '✅';
        icon.style.color = 'green';
    } else {
        icon.textContent = '❌';
        icon.style.color = 'red';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector('.form-popup');
    const closeBtn = document.querySelector('.close-btn');
    const addPlayerBtn = document.querySelector('.add-button');
    const errorMessages = document.getElementById('errorMessages');

    // Load saved data from localStorage
    loadSavedData();

    // Open popup
    addPlayerBtn.addEventListener("click", () => {
        popup.classList.add('active');
        document.body.classList.add('popup-active');
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.classList.remove('active');
        document.body.classList.remove('popup-active');
    });

    // Validate form and save data
    document.getElementById('submit-form-btn').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        if (validateForm()) {
            savePlayerData();
        }
    });

    // Fetch players from JSON
    fetchPlayersFromJSON();
});

function validateForm() {
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';
    const errors = [];

    const name = document.getElementById('name').value.trim();
    if (!name) errors.push('Name is required.');

    const position = document.getElementById('position').value;
    const nationality = document.getElementById('nationality').value;
    const club = document.getElementById('club').value;
    if (!position) errors.push('Please select a position.');
    if (!nationality) errors.push('Please select a nationality.');
    if (!club) errors.push('Please select a club.');

    const numericFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    numericFields.forEach((field) => {
        const value = document.getElementById(field).value;
        if (!value || value < 1 || value > 99) {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} must be between 1 and 99.`);
        }
    });

    const photo = document.querySelector('.upload-img-photo input[type="file"]').files.length;
    const flag = document.querySelector('.upload-img-flag input[type="file"]').files.length;
    const logo = document.querySelector('.upload-img-logo input[type="file"]').files.length;
    if (!photo) errors.push('Player photo is required.');
    if (!flag) errors.push('Nationality flag is required.');
    if (!logo) errors.push('Club logo is required.');

    if (errors.length > 0) {
        errors.forEach((error) => {
            const errorItem = document.createElement('p');
            errorItem.textContent = error;
            errorItem.style.color = 'red';
            errorMessages.appendChild(errorItem);
        });
        return false;
    }
    return true;
}

function savePlayerData() {
    const player = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        nationality: document.getElementById('nationality').value,
        club: document.getElementById('club').value,
        rating: document.getElementById('rating').value,
        pace: document.getElementById('pace').value,
        shooting: document.getElementById('shooting').value,
        passing: document.getElementById('passing').value,
        dribbling: document.getElementById('dribbling').value,
        defending: document.getElementById('defending').value,
        physical: document.getElementById('physical').value,
    };

    // Save data to localStorage
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));

    alert("Player data saved successfully!");
}

function loadSavedData() {
    const players = JSON.parse(localStorage.getItem('players'));
    if (players) {
        console.log("Loaded Players:", players); // You can populate the UI with this data.
    }
}

function fetchPlayersFromJSON() {
    fetch('players.json') // Adjust the path if necessary
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Players:", data.players); // Populate your app with fetched data
        })
        .catch((error) => console.error('Error fetching JSON:', error));
}


