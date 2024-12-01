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
    let errors = false;

    document.querySelectorAll('.error-message').forEach(span => {
        span.innerText = '';
    });

    const fields = [
        { id: 'name', errorId: 'error-name', errorMsg: 'Name is required.' },
        { id: 'position', errorId: 'error-position', errorMsg: 'Position is required.' },
        { id: 'nationality', errorId: 'error-nationality', errorMsg: 'Nationality is required.' },
        { id: 'club', errorId: 'error-club', errorMsg: 'Club is required.' },
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
        const value = document.getElementById(field).value;
        if (!value || value < 1 || value > 99) {
            document.getElementById(`error-${field}`).innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} must be between 1 and 99.`;
            document.getElementById(`error-${field}`).style.color = 'red'; 
            errors = true;
        }
    });

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

    alert('Form submitted successfully!');
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector('.form-popup');
    const closeBtn = document.querySelector('.close-btn');
    const addPlayerBtn = document.querySelector('.add-button');

    // Ouvrir et fermer la popup
    addPlayerBtn.addEventListener("click", () => {
        popup.classList.add('active');
        document.body.classList.add('popup-active');
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove('active');
        document.body.classList.remove('popup-active');
    });

    // Validation du formulaire à la soumission
    document.getElementById('submit-form-btn').addEventListener('click', (e) => {
        e.preventDefault();
        validateForm();
    });
});


function fetchPlayersFromJSON() {
    fetch('players.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched Players:", data.players);
        })
        .catch((error) => console.error('Error fetching JSON:', error));
}


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



function addPlayer() {
    const name = document.getElementById('name').value.trim();
    const position = document.getElementById('position').value;
    const nationality = document.getElementById('nationality').value;
    const club = document.getElementById('club').value;
    const rating = parseInt(document.getElementById('rating').value);
    const pace = parseInt(document.getElementById('pace').value);
    const shooting = parseInt(document.getElementById('shooting').value);
    const passing = parseInt(document.getElementById('passing').value);
    const dribbling = parseInt(document.getElementById('dribbling').value);
    const defending = parseInt(document.getElementById('defending').value);
    const physical = parseInt(document.getElementById('physical').value);

    if (!name || !position || !nationality || !club ||
        isNaN(rating) || isNaN(pace) || isNaN(shooting) ||
        isNaN(passing) || isNaN(dribbling) || isNaN(defending) || isNaN(physical)) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }

    const player = {
        name,
        position,
        nationality,
        club,
        rating,
        pace,
        shooting,
        passing,
        dribbling,
        defending,
        physical
    };

    const players = JSON.parse(localStorage.getItem('players')) || [];

    if (players.length >= 11) {
        alert('Vous ne pouvez pas ajouter plus de 11 joueurs à votre formation.');
        return;
    }

    players.push(player);

    localStorage.setItem('players', JSON.stringify(players));

    alert(`Joueur ${name} ajouté avec succès !`);
    document.querySelector('.form-popup').classList.remove('active');
    document.body.classList.remove('popup-active');

    displayPlayers();
}