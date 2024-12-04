const themeSwitcher = document.getElementById("theme-switcher");
const body = document.body;
let playersData;
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

fetch('players.json')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched Players:", data.players);
        playersData = data.players;
    })
    .catch(error => console.error('Error fetching JSON:', error));

    const popupJoueurs = document.querySelector('#gk');
    const gg = document.querySelector('.popupJoueurs');
    const closePopupJoueurs = document.querySelector('.close-btn-joueurs');    
    
    popupJoueurs.addEventListener('click', () => {
        gg.classList.add('active');
        document.body.classList.add('popup-active');
        
        const playersFilter = document.getElementById('player-filter');
        playersFilter.innerHTML = '';
        let dataFilter = playersData.filter(player => player.position === "ST");
        dataFilter.forEach(player => {
            const playerCard = `
                <div class="card" >
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

            playersFilter.innerHTML += playerCard;
        });



        document.querySelector(".player-filter").appendChild(
            playersFilter
        )
    });
    closePopupJoueurs.addEventListener('click', () => {
        gg.classList.remove('active');
        document.body.classList.remove('popup-active');
    });
    


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

function updateFieldsBasedOnPosition(position) {
    const numericFieldsContainer = document.querySelector(".formation");

    if (!numericFieldsContainer) {
        console.error("Le conteneur '.formation' est introuvable !");
        return;
    }

    const goalkeeperFields = [
        { label: "Handling", id: "handling" },
        { label: "Kicking", id: "kicking" },
        { label: "Reflexes", id: "reflexes" },
        { label: "Speed", id: "speed" },
        { label: "Positioning", id: "positioning" }
    ];

    const defaultFields = [
        { label: "Pace", id: "pace" },
        { label: "Shooting", id: "shooting" },
        { label: "Passing", id: "passing" },
        { label: "Dribbling", id: "dribbling" },
        { label: "Defending", id: "defending" },
        { label: "Physical", id: "physical" }
    ];

    const fields = position === "Goalkeeper (GK)" ? goalkeeperFields : defaultFields;

    numericFieldsContainer.innerHTML = '';
    fields.forEach(field => {
        const divFormation = document.createElement("div");
        const fieldDiv = document.createElement("div");
        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label;

        divFormation.classList.add("stats-form");
        console.log(divFormation)

        const input = document.createElement("input");
        input.type = "number";
        input.id = field.id;
        input.name = field.id;
        input.classList.add("inputs");
        input.placeholder = field.label;

        const span = document.createElement("span");
        span.classList.add("erreur-message");
        span.id = `erreur-${field.id}`;

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        fieldDiv.appendChild(span);
        divFormation.appendChild(fieldDiv)
        numericFieldsContainer.appendChild(divFormation);
    });


    if (document.getElementById('position').value === "Goalkeeper (GK)") {
        const goalkeepingFields = ["handling", "kicking", "reflexes", "speed", "positioning"];
        goalkeepingFields.forEach(field => {
            let value = parseInt(document.getElementById(field).value);
            if (isNaN(value) || value < 20 || value > 99) {
                document.getElementById(`erreur-${field}`).innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} must be between 20 and 99.`;
                document.getElementById(`erreur-${field}`).style.color = 'red';
                errors = true;
            } else {
                document.getElementById(`erreur-${field}`).innerText = ''
            }
        });
    }
}

function validateForm() {
    let errors = false;
    const fields = [
        { id: "flag", errorId: "erreur-flag", errorMsg: "Flag is required." },
        { id: "logo", errorId: "erreur-logo", errorMsg: "Logo is required." },
        { id: "photo", errorId: "erreur-image", errorMsg: "Player photo URL is required." },
        { id: "name", errorId: "erreur-name", errorMsg: "Name is required." },
        { id: "rating", errorId: "erreur-rating", errorMsg: "Rating is required." },
        { id: "position", errorId: "erreur-position", errorMsg: "Position is required." },
        { id: "nationality", errorId: "erreur-nationality", errorMsg: "Nationality is required." },
        { id: "club", errorId: "erreur-club", errorMsg: "Club is required." },

    ];


    for (let i = 0; i < fields.length; i++) {
        let span = document.getElementById(fields[i].errorId)
        if (document.getElementById(fields[i].id).value === "") {
            span.innerText = fields[i].errorMsg
            span.style.color = 'red'
            errors = true;
        } else {
            span.innerText = ''
            errors = false;
        }
    }


    const numericFields = [
        "rating", "pace", "shooting", "passing", "dribbling", "defending", "physical",
        "handling", "kicking", "positioning", "reflexes", "speed"
    ];

    numericFields.forEach(field => {
        let value = parseInt(document.getElementById(field).value);
        if (isNaN(value) || value < 20 || value > 99) {
            document.getElementById(`erreur-${field}`).innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} must be between 20 and 99.`;
            document.getElementById(`erreur-${field}`).style.color = 'red';
            errors = true;
        } else {
            document.getElementById(`erreur-${field}`).innerText = "";
        }
    });

    return !errors;
}

function displayPlayers() {
    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            const players = data.players;
            const playersList = document.getElementById('players-lists');
            const playerListResrve = document.getElementById('player-lists');
            playersList.innerHTML = '';
            players.forEach(player => {
                const playerCard = `
                <div class="card" >
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
            playerListResrve.innerHTML = '';
            players.forEach(player => {
                const playerCard = `
                <div class="card" >
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
                playerListResrve.innerHTML += playerCard;
            });
        })
        .catch(error => console.error('Erreur lors du chargement des joueurs :', error));
}

function reservePlayers() {
    displayPlayers();
}

document.getElementById("position").addEventListener("change", function () {
    updateFieldsBasedOnPosition(this.value);
});

document.getElementById('myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
    }
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

    document.getElementById('submit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        validateForm();
    });
});
document.querySelector('.show-button').addEventListener('click', () => {
    document.getElementById('show-players-popup').classList.add('active');
    displayPlayers();
});

document.querySelector('.close-btn-display-all').addEventListener('click', () => {
    document.getElementById('show-players-popup').classList.remove('active');
});
document.querySelector('.reserve-button').addEventListener('click', () => {
    document.getElementById('reserve-players-popup').classList.add('active');
    reservePlayers()
});

document.querySelector('.close-btn-reserve').addEventListener('click', () => {
    document.getElementById('reserve-players-popup').classList.remove('active');
});


    const cont = document.querySelectorAll(".card-cont");

    