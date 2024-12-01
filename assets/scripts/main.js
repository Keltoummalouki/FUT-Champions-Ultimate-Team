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

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector('.form-popup');
    const closeBtn = document.querySelector('.close-btn');
    const addPlayerBtn = document.querySelector('.add-button');

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
        validateForm();
    });
});

function validateFileInput(inputId, errorId, fieldName) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput?.files[0];
    const errorMessageElement = document.getElementById(errorId);

    if (!file) {
        errorMessageElement.innerText = `${fieldName} is required.`;
        errorMessageElement.style.color = 'red';
        return false;
    }

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
        errorMessageElement.innerText = `${fieldName} must be a PNG or JPG file.`;
        errorMessageElement.style.color = 'red';
        return false;
    }

    if (file.size > 2 * 1024 * 1024) {
        errorMessageElement.innerText = `${fieldName} must be less than 2MB.`;
        errorMessageElement.style.color = 'red';
        return false;
    }

    errorMessageElement.innerText = '';
    return true;
}

function validateForm() {
    let errors = false;

    document.querySelectorAll('.error-message').forEach(span => {
        span.innerText = '';
    });

    const fields = [
        { id: 'file-upload-flag', errorId: 'flag-icon-error', errorMsg: 'Flag is required.' },
        { id: 'file-upload-logo', errorId: 'logo-icon-error', errorMsg: 'Flag is required.' },
        { id: 'name', errorId: 'error-name', errorMsg: 'Name is required.' },
        { id: 'position', errorId: 'position-error', errorMsg: 'Position is required.' },
        { id: 'nationality', errorId: 'nationality-error', errorMsg: 'Nationality is required.' },
        { id: 'club', errorId: 'club-error', errorMsg: 'Club is required.' },
        { id: 'photo', errorId: 'img-url-error', errorMsg: 'Player photo URL is required.' },
        { id: 'pace' , errorId: 'error-pace', errorMsg: 'Pace is required.' },
        { id: 'dribbling' , errorId: 'error-dribbling', errorMsg: 'Dribbling is required.' },
        { id: 'passing' , errorId: 'error-passing', errorMsg: 'Passing is required.' },
        { id: 'shooting' , errorId: 'error-shooting', errorMsg: 'Shooting is required.' },
        { id: 'defending' , errorId: 'error-defending', errorMsg: 'Defending is required.' },
        { id: 'physical' , errorId: 'error-physical', errorMsg: 'Physical is required.' },
        
        { id: 'handling' , errorId: 'hand-error', errorMsg: 'Handling is required.' },
        { id: 'kicking' , errorId: 'kick-error', errorMsg: 'Kicking is required.' },
        { id: 'positioning' , errorId: 'pos-error', errorMsg: 'Positioning is required.' },
        { id: 'reflexes' , errorId: 'ref-error', errorMsg: 'Reflexes is required.' },
        { id: 'speed' , errorId: 'speed-error', errorMsg: 'Speed is required.' },
    ];

    fields.forEach(field => {
        const value = document.getElementById(field.id).value.trim();
        if (!value) {
            document.getElementById(field.errorId).innerText = field.errorMsg;
            document.getElementById(field.errorId).style.color = 'red';
            errors = true;
        }
    });

    const numericFields = ['rating', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    numericFields.forEach(field => {
        const value = parseInt(document.getElementById(field).value);
        if (isNaN(value) || value < 1 || value > 99) {
            document.getElementById(`error-${field}`).innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} must be between 1 and 99.`;
            document.getElementById(`error-${field}`).style.color = 'red';
            errors = true;
        }
    });

    if (!validateFileInput('file-upload-flag', 'flag-icon-error', 'Nationality Flag')) {
        errors = true;
    }
    if (!validateFileInput('file-upload-logo', 'logo-icon-error', 'Club Logo')) {
        errors = true;
    }

    return !errors;
}

document.getElementById('submit-form-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
    }
});

function updateFieldsBasedOnPosition(position) {
    const numericFieldsContainer = document.querySelector(".formation");

    if (!numericFieldsContainer) {
        console.error("Le conteneur '.formation' est introuvable !");
        return;
    }

    const goalkeeperFields = `
        <div class="stats-form">
            <div>
                <label for="handling">Handling</label>
                <input type="number" id="handling" name="handling" min="1" max="99" class="inputs" placeholder="Handling">
                <span id="hand-error" class="error-message"></span>
            </div>
            <div>
                <label for="kicking">Kicking</label>
                <input type="number" id="kicking" name="kicking" min="1" max="99" class="inputs" placeholder="Kicking">
                <span id="kick-error" class="error-message"></span>
            </div>
            <div>
                <label for="reflexes">Reflexes</label>
                <input type="number" id="reflexes" name="reflexes" min="1" max="99" class="inputs" placeholder="Reflexes">
                <span id="ref-error" class="error-message"></span>
            </div>
            <div>
                <label for="speed">Speed</label>
                <input type="number" id="speed" name="speed" min="1" max="99" class="inputs" placeholder="Speed">
                <span id="speed-error" class="error-message"></span>
            </div>
            <div>
                <label for="positioning">Positioning</label>
                <input type="number" id="positioning" name="positioning" min="1" max="99" class="inputs" placeholder="Positioning">
                <span id="pos-error" class="error-message"></span>
            </div>
        </div>
    `;

    const defaultFields = `
        <div class="stats-form">
            <div>
                <label for="pace">Pace</label>
                <input type="number" id="pace" name="pace" min="1" max="99" class="inputs" placeholder="Pace">
                <span class="error-message" id="error-pace"></span>
            </div>
            <div>
                <label for="shooting">Shooting</label>
                <input type="number" id="shooting" name="shooting" min="1" max="99" class="inputs" placeholder="Shooting">
                <span class="error-message" id="error-shooting"></span>
            </div>
            <div>
                <label for="passing">Passing</label>
                <input type="number" id="passing" name="passing" min="1" max="99" class="inputs" placeholder="Passing">
                <span class="error-message" id="error-passing"></span>
            </div>
            <div>
                <label for="dribbling">Dribbling</label>
                <input type="number" id="dribbling" name="dribbling" min="1" max="99" class="inputs" placeholder="Dribbling">
                <span class="error-message" id="error-dribbling"></span>
            </div>
            <div>
                <label for="defending">Defending</label>
                <input type="number" id="defending" name="defending" min="1" max="99" class="inputs" placeholder="Defending">
                <span class="error-message" id="error-defending"></span>
            </div>
            <div>
                <label for="physical">Physical</label>
                <input type="number" id="physical" name="physical" min="1" max="99" class="inputs" placeholder="Physical">
                <span class="error-message" id="error-physical"></span>
            </div>
        </div>
    `;

    numericFieldsContainer.innerHTML = position === "Goalkeeper (GK)" ? goalkeeperFields : defaultFields;
}

document.getElementById("position").addEventListener("change", function () {
    updateFieldsBasedOnPosition(this.value);
});


function fetchPlayersFromJSON() {
    fetch('players.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Players:", data.players);
        })
        .catch((error) => console.error('Error fetching JSON:', error));
}

function displayPlayers() {
    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            const players = data.players;
            const playersList = document.getElementById('players-list');
            playersList.innerHTML = '';

            players.forEach(player => {
                const playerCard = `
                <div class="card">
                    <div class="photo">
                        <img src="${player.photo}" alt="${player.name}">
                    </div>
                    <div id="name-place">
                        <div class="name">${player.name}</div>
                    </div>
                    <div class="rat-rate">${player.rating}</div>
                    <div class="position">${player.position}</div>
                    <div class="club-flag">
                        <img class="flag" src="${player.flag}" alt="${player.nationality}">
                        <img class="logo" src="${player.logo}" alt="${player.club}">
                    </div>
                    <div class="stats">
                        <div id="stats-1">
                            <div class="content-stats">
                                <div>PAC</div><div>${player.pace}</div>
                                <div>SHO</div><div>${player.shooting}</div>
                                <div>PAS</div><div>${player.passing}</div>
                            </div>
                        </div>
                        <div id="stats-2">
                            <div class="content-stats">
                                <div>DRI</div><div>${player.dribbling}</div>
                                <div>DEF</div><div>${player.defending}</div>
                                <div>PHY</div><div>${player.physical}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                playersList.innerHTML += playerCard;
            });
        })
        .catch(error => console.error('Erreur lors du chargement des joueurs :', error));
}

document.querySelector('.show-button').addEventListener('click', () => {
    document.getElementById('players-popup').classList.add('active');
    displayPlayers();
});

document.querySelector('.close-btn-display-all').addEventListener('click', () => {
    document.getElementById('players-popup').classList.remove('active');
});

