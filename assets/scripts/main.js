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

    loadSavedData();

    addPlayerBtn.addEventListener("click", () => {
        popup.classList.add('active');
        document.body.classList.add('popup-active');
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove('active');
        document.body.classList.remove('popup-active');
    });

    document.getElementById('submit-form-btn').addEventListener('click', (e) => {
        e.preventDefault();
        if (validateForm()) {
            savePlayerData();
        }
    });

    fetchPlayersFromJSON();
});

function validateForm() {

    document.querySelectorAll('.error-message').forEach(span => {
        span.innerText = '';
    });

    let errors = false;

    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('error-name').innerText = 'Name is required.';
        errors = true;
    }

    const position = document.getElementById('position').value;
    if (!position) {
        document.getElementById('error-position').innerText = 'Position is required.';
        errors = true;
    }

    const nationality = document.getElementById('nationality').value;
    if (!nationality) {
        document.getElementById('error-nationality').innerText = 'Nationality is required.';
        errors = true;
    }

    const club = document.getElementById('club').value;
    if (!club) {
        document.getElementById('error-club').innerText = 'Club is required.';
        errors = true;
    }

    const numericFields = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'rating'];
    numericFields.forEach(field => {
        const value = document.getElementById(field).value;
        if (!value || value < 1 || value > 99) {
            document.getElementById(`error-${field}`).innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} must be between 1 and 99.`;
            errors = true;
        }
    });

    const validateFile = (id, errorId, fieldName) => {
        const fileInput = document.getElementById(id);
        const file = fileInput?.files[0];
        if (!file) {
            document.getElementById(errorId).innerText = `${fieldName} is required.`;
            errors = true;
        } else if (!file.name.toLowerCase().endsWith('.png')) {
            document.getElementById(errorId).innerText = `${fieldName} must be a PNG file.`;
            errors = true;
        }
    };

    validateFile('photo', 'error-photo', 'Player Photo');
    validateFile('flag', 'error-flag', 'Nationality Flag');
    validateFile('logo', 'error-logo', 'Club Logo');

    if (errors) {
        return false;
    }

    alert('Form submitted successfully!');
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

    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));

    alert("Player data saved successfully!");
}

function loadSavedData() {
    const players = JSON.parse(localStorage.getItem('players'));
    // if (players) {
    //     console.log("Loaded Players:", players); 
    // }
}

function fetchPlayersFromJSON() {
    fetch('players.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Players:", data.players);
        })
        .catch((error) => console.error('Error fetching JSON:', error));
}


document.getElementById("position").addEventListener("change", function () {
    const position = this.value;
    const numericFieldsContainer = document.querySelector(".formation");
    const goalkeeperFields = `
        <div>
            <label for="diving">Diving</label>
            <input type="number" id="diving" name="diving" min="1" max="99" class="inputs" placeholder="Diving">
        </div>
        <div>
            <label for="handling">Handling</label>
            <input type="number" id="handling" name="handling" min="1" max="99" class="inputs" placeholder="Handling">
        </div>
        <div>
            <label for="kicking">Kicking</label>
            <input type="number" id="kicking" name="kicking" min="1" max="99" class="inputs" placeholder="Kicking">
        </div>
        <div>
            <label for="reflexes">Reflexes</label>
            <input type="number" id="reflexes" name="reflexes" min="1" max="99" class="inputs" placeholder="Reflexes">
        </div>
        <div>
            <label for="speed">Speed</label>
            <input type="number" id="speed" name="speed" min="1" max="99" class="inputs" placeholder="Speed">
        </div>
        <div>
            <label for="positioning">Positioning</label>
            <input type="number" id="positioning" name="positioning" min="1" max="99" class="inputs" placeholder="Positioning">
        </div>
    `;

    if (position === "Goalkeeper (GK)") {
        numericFieldsContainer.innerHTML = goalkeeperFields;
    } else {
        const defaultFields = `
            <div>
                <label for="rating">Rating</label>
                <input type="number" id="rating" name="rating" min="1" max="99" class="inputs" placeholder="Rating">
            </div>
            <div>
                <label for="pace">Pace</label>
                <input type="number" id="pace" name="pace" min="1" max="99" class="inputs" placeholder="Pace">
            </div>
            <div>
                <label for="shooting">Shooting</label>
                <input type="number" id="shooting" name="shooting" min="1" max="99" class="inputs" placeholder="Shooting">
            </div>
            <div>
                <label for="passing">Passing</label>
                <input type="number" id="passing" name="passing" min="1" max="99" class="inputs" placeholder="Passing">
            </div>
            <div>
                <label for="dribbling">Dribbling</label>
                <input type="number" id="dribbling" name="dribbling" min="1" max="99" class="inputs" placeholder="Dribbling">
            </div>
            <div>
                <label for="defending">Defending</label>
                <input type="number" id="defending" name="defending" min="1" max="99" class="inputs" placeholder="Defending">
            </div>
            <div>
                <label for="physical">Physical</label>
                <input type="number" id="physical" name="physical" min="1" max="99" class="inputs" placeholder="Physical">
            </div>
        `;
        numericFieldsContainer.innerHTML = defaultFields;
    }
});

