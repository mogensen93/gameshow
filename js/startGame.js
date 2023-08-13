// Function to create input fields based on the entered number
if (localStorage.getItem("players")) {
  startGame();
} else {
  introMusic.play();

  setTimeout(() => {
    document.querySelector(".logo-initial").style.top = "200px";
  }, "500");

  setTimeout(() => {
    document.querySelector(".introScreen").style.opacity = "1";
  }, "600");
}

function showPregameScreen() {
  introScreen.style.opacity = "0";
  introScreen.style.zIndex = "0";
  preGameScreen.style.opacity = "1";
}

function createInputFields() {
  const playerCount = parseInt(document.getElementById("playerCount").value);

  if (!playerCount) return alert("Number, so.");

  const inputFieldsContainer = document.getElementById(
    "inputFieldsContainer"
  );
  // Clear existing input fields
  inputFieldsContainer.innerHTML = "";
  document.querySelector("#savePlayersButton").style.display = "block";

  // List Team A
  const teamBlueContainer = document.createElement("div");
  teamBlueContainer.classList.add("team-containerBlue");
  const headlineTeamBlue = document.createElement("h2");
  headlineTeamBlue.innerHTML = "Blå";
  headlineTeamBlue.style.color = "#fff";
  teamBlueContainer.append(headlineTeamBlue);

  // List Team B
  const teamRedContainer = document.createElement("div");
  teamRedContainer.classList.add("team-containerRed");
  const headlineTeamRed = document.createElement("h2");
  headlineTeamRed.innerHTML = "Rød";
  headlineTeamRed.style.color = "#fff";
  teamRedContainer.append(headlineTeamRed);

  for (let i = 0; i < playerCount; i++) {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = `Player ${i + 1}`;
    inputField.classList.add("player-input");

    // Assign input fields to Team A if i is even, else assign to Team B
    if ((i + 1) % 2 === 0) {
      teamRedContainer.appendChild(inputField);
    } else {
      teamBlueContainer.appendChild(inputField);
    }
  }

  inputFieldsContainer.appendChild(teamBlueContainer);
  inputFieldsContainer.appendChild(teamRedContainer);

  const numberOfPlayersElement = document.querySelector(".numberOfPlayers");
  numberOfPlayersElement.style.transition = "transform 0.5s ease"; // Add the transition property
  numberOfPlayersElement.style.transform = "translateX(1999px)";

  setTimeout(function () {
    const gameOptionsContainer = document.querySelector(".gameOptionsContainer");
    gameOptionsContainer.style.opacity = "1";
    gameOptionsContainer.style.transition = "all 0.5s ease"; // Add the transition property
    gameOptionsContainer.style.transform = "translateX(0)";
    gameOptionsContainer.style.height = "auto";

    // Show the team containers
    inputFieldsContainer.style.opacity = "1";
    inputFieldsContainer.style.transition = "all 0.5s ease"; // Add the transition property
    inputFieldsContainer.style.transform = "translateX(0)";
    inputFieldsContainer.style.height = "auto";
    numberOfPlayersElement.style.display = 'none';
  }, 500);
  createGameOptionButtons()
}



function createGameOptionButtons() {
  const gameOptionsContainer = document.querySelector("#gameOptions");
  const categoriesContainer = document.querySelector("#categories");
  const maxGamesContainer = document.querySelector("#numberOfGames");

  const filtersWrapper = document.createElement('div')
  gameOptionsContainer.append(filtersWrapper);

  // Include Alcohol
  const removeAlcoholCardsToggle = document.createElement('input');
  removeAlcoholCardsToggle.classList.add('remove-alcohol-toggle');
  removeAlcoholCardsToggle.setAttribute("type", "checkbox");
  removeAlcoholCardsToggle.setAttribute("id", "removeAlcoholToggle"); // Set an id for the checkbox
  gameOptionsContainer.append(removeAlcoholCardsToggle);

  // Create a label for the "Include Alcohol" checkbox
  const removeAlcoholLabel = document.createElement('label');
  removeAlcoholLabel.setAttribute("for", "removeAlcoholToggle"); // Set the 'for' attribute to match the checkbox id
  removeAlcoholLabel.textContent = "Fjern alkohol kort?"; // Set the label text
  gameOptionsContainer.append(removeAlcoholLabel);

  // Set initial value in localStorage
  localStorage.setItem("beer", true);

  // Add event listener to update localStorage on change
  removeAlcoholCardsToggle.addEventListener("change", function () {
    localStorage.setItem("beer", !this.checked);
  });

  // Online Only
  const onlineOnlyToggleContainer = document.createElement('div');
  filtersWrapper.append(onlineOnlyToggleContainer);
  const onlineOnlyToggle = document.createElement('input');
  onlineOnlyToggle.classList.add('online-only-toggle');
  onlineOnlyToggle.setAttribute("type", "checkbox");
  onlineOnlyToggle.setAttribute("id", "onlineOnlyToggle"); // Set an id for the checkbox
  onlineOnlyToggleContainer.append(onlineOnlyToggle);

  // Create a label for the "Online Only" checkbox
  const onlineOnlyLabel = document.createElement('label');
  onlineOnlyLabel.setAttribute("for", "onlineOnlyToggle"); // Set the 'for' attribute to match the checkbox id
  onlineOnlyLabel.textContent = "Kun online spil?"; // Set the label text
  onlineOnlyToggleContainer.append(onlineOnlyLabel);

  // Set initial value in localStorage
  localStorage.setItem("online-only", false);

  // Add event listener to update localStorage on change
  onlineOnlyToggle.addEventListener("change", function () {
    localStorage.setItem("online-only", this.checked);
  });

  // Offline Only
  const offlineToggleContainer = document.createElement('div');
  filtersWrapper.append(offlineToggleContainer);
  const offlineOnlyToggle = document.createElement('input');
  offlineOnlyToggle.classList.add('offlineOnlyToggle-only-toggle');
  offlineOnlyToggle.setAttribute("type", "checkbox");
  offlineOnlyToggle.setAttribute("id", "offlineOnlyToggle"); // Set an id for the checkbox
  offlineToggleContainer.append(offlineOnlyToggle);

  // Create a label for the "Offline Only" checkbox
  const offlineOnlyLabel = document.createElement('label');
  offlineOnlyLabel.setAttribute("for", "offlineOnlyLabel"); // Set the 'for' attribute to match the checkbox id
  offlineOnlyLabel.textContent = "Kun offline spil?"; // Set the label text
  offlineToggleContainer.append(offlineOnlyLabel);

  // Set initial value in localStorage
  localStorage.setItem("offline-only", false);

  // Add event listener to update localStorage on change
  offlineOnlyToggle.addEventListener("change", function () {
    localStorage.setItem("offline-only", this.checked);
  });

  const categories = new Set();
  fetchGamesData().then((gamesData) => {
    games = gamesData;

    const maxGamesInput = document.createElement("input");
    maxGamesInput.type = "text";
    maxGamesInput.value = 10;
    localStorage.setItem("max-number-of-games", 10);
    maxGamesInput.classList.add("numberOfGames");
    maxGamesContainer.append(maxGamesInput);

    const totalGamesNumber = document.createElement("span")
    totalGamesNumber.innerText = `Ud af ${games.length}`
    maxGamesContainer.append(totalGamesNumber)
    maxGamesInput.addEventListener("change", function () {
      localStorage.setItem("max-number-of-games", this.value);
    });

    for (const item of games) {
      categories.add(item.type);
    }
    const uniqueCategoriesArray = Array.from(categories);
    selectedCategories = uniqueCategoriesArray;

    for (const category of uniqueCategoriesArray) {
      const categoriesWrapper = document.createElement('div')
      const categoryCheckbox = document.createElement('input');
      categoryCheckbox.setAttribute('type', 'checkbox');
      categoryCheckbox.setAttribute('id', `${category}Checkbox`);
      categoryCheckbox.setAttribute('name', 'categoryCheckbox');
      categoryCheckbox.checked = true;

      const categoryLabel = document.createElement('label');
      categoryLabel.setAttribute('for', `${category}Checkbox`);
      categoryLabel.textContent = category;

      categoriesContainer.appendChild(categoriesWrapper);
      categoriesWrapper.appendChild(categoryCheckbox);
      categoriesWrapper.appendChild(categoryLabel);

      categoryCheckbox.addEventListener('change', () => {
        if (categoryCheckbox.checked) {
          addToSelectedCategories(category);
          console.log(selectedCategories)
        } else {
          removeFromSelectedCategories(category);
        }
      });

      if (isSelected(category)) {
        categoryCheckbox.checked = true;
      }
    }
  });
}

function savePlayers() {
  const players = [];
  const teamBlue = document.querySelectorAll('.team-containerBlue input[type="text"]')
  const teamRed = document.querySelectorAll('.team-containerRed input[type="text"]')

  teamBlue.forEach((input) => {
    const player = {
      name: input.value,
      team: "Team Blue",
    };
    players.push(player);
  });

  teamRed.forEach((input) => {
    const player = {
      name: input.value,
      team: "Team Red",
    };
    players.push(player);
  });

  const filteredGames = games.filter(obj => selectedCategories.includes(obj.type));
  localStorage.setItem('chosen-games', JSON.stringify(filteredGames));

  console.log(filteredGames)

  // Save players array to local storage as a JSON string
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("current-round", cardsPlayed);
  shuffleStartTurn();
  startGame();
}

function startGame() {
  introMusic.pause();
  document.querySelector(".settings-button").style.display = "block";

  // hide
  preGameScreen.style.display = "none";
  document.querySelector("#redTurn").style.display = "none";
  document.querySelector("#logo").style.display = "none";

  // show
  gameScreen.style.display = "grid";
  scoreContainer.style.display = "flex";
  gameMusic.play();
  buildGame();
}

/* GAME CARDS */
function turnCard(tile, card, game) {
  const isCardPlayed = tile.classList.contains('card-played')

  if (isCardPlayed) return;

  click.play();
  openAction.play();
  gameMusic.pause();

  toggleOverlay();

  // Hello card
  activeCardContainer.append(card);
  activeCardContainer.style.transform = 'translate(0px)';

  card.style.display = "block";


  if (turn === "blue") {
    tile.style.backgroundColor = blueColor;
  } else {
    tile.style.backgroundColor = redColor;
  }

  tileTitle = tile.querySelector("h2")
  tileTitle.innerText = game.title;
  tile.classList.add('card-played')
  tileTitle.classList.remove('tileTitle')
  tileTitle.style.color = 'white';
  tileImg = tile.querySelector(".tileImg")
  tileImg.remove();

  tileType = tile.querySelector(".game-type");
  tileType.innerText = '';

  tilePlayedNumber = document.createElement('span');
  tilePlayedNumber.innerText = cardsPlayed;


  // Create done button
  const button = document.createElement("button");
  button.classList.add("card-button");
  button.innerHTML = "Færdig &raquo;";
  card.append(button);

  button.onclick = function () {
    activeCardContainer.style.transform = 'translate(2000px)';
    setTimeout(() => {
      card.remove();
      showAfterGameScreen(game.points, game.title);
    }, 700);
  };
}

function buildGame() {
  let chosenGames = JSON.parse(localStorage.getItem('chosen-games')); // Parse the JSON data
  const numberOfGames = JSON.parse(localStorage.getItem('max-number-of-games')); // Parse the JSON data

// Filters 
const includeBeer = JSON.parse(localStorage.getItem('beer')); // Parse the JSON data
const onlineOnly = JSON.parse(localStorage.getItem('online-only')); // Parse the JSON data
const offlineOnly = JSON.parse(localStorage.getItem('offline-only')); // Parse the JSON data

if (onlineOnly) {
  chosenGames = chosenGames.filter(game => game.online);
}

if (offlineOnly) {
  chosenGames = chosenGames.filter(game => game.online);
}

if (!includeBeer) {
  chosenGames = chosenGames.filter(game => !game.alcohol);
}
  console.log(chosenGames);
  // SHUFFLE
  for (let i = chosenGames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chosenGames[i], chosenGames[j]] = [chosenGames[j], chosenGames[i]];
  }


  if (chosenGames.length > numberOfGames) {
    chosenGames = chosenGames.slice(0, numberOfGames); // Truncate the array to match the maximum number of games
  }

  console.log(chosenGames)

  totalGameCards = chosenGames.length
  chosenGames.forEach((game) => {
    //Tile
    const gameTile = document.createElement("div");
    gameTile.classList.add("gameTile");
    gameScreen.append(gameTile);

    // Tile title
    const title = document.createElement("h2");
    title.classList.add('tileTitle')
    gameTile.append(title);

    // Tile img 
    const img = document.createElement('img')
    img.setAttribute('src', './img/gameCard.PNG');
    img.classList.add('tileImg')

    gameTile.append(img);

    // Tile type
    const type = document.createElement("span");
    type.classList.add("game-type")
    if (game.type || game.type != '') {
      type.innerText = game.type;
    } else {
      type.innerText = '?';

    }
    gameTile.append(type);

    // Card
    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");

    // Card Title
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("gameCardTitle");
    cardTitle.innerText = game.title;
    gameCard.append(cardTitle);
    gameCard.setAttribute("data-points", game.points);

    if (game.description) {
      const titleOfdescription = document.createElement("h3")
      titleOfdescription.innerText = "Beskrivelse"

      gameCard.append(titleOfdescription)
      const description = document.createElement("p")
      description.innerText = game.description;
      description.classList.add("description")
      gameCard.append(description);
    }

    const pointsTitle = document.createElement("h3")
    pointsTitle.innerText = "Points"
    gameCard.append(pointsTitle)

    const points = document.createElement("p")
    points.innerText = game.points;
    points.classList.add("description")
    gameCard.append(points);

    if (game.link) {
      const link = document.createElement("a")
      link.innerText = 'Åben link';
      link.classList.add("link")
      gameCard.append(link);
      link.addEventListener('click', function (event) {
        event.preventDefault();
        window.open(game.link, '_blank');
        link.remove();
      });
    }

    if (game.img) {
      const img = document.createElement("img")
      img.classList.add('img')
      img.setAttribute("src", game.img)
      gameCard.append(img);
      img.addEventListener('click', function () {
        img.remove();
      });
    }

    if (game.video && isValidYouTubeUrl(game.video)) {
      const video = createYouTubePlayer(game.video);
      gameCard.append(video);
    }

    gameTile.addEventListener("click", () => {
      turnCard(gameTile, gameCard, game);
    });
  });

  //animate
  const tiles = document.querySelectorAll(".gameTile");
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      flipCard.currentTime = 0;
      flipCard.play();
      tile.style.opacity = "1";
      tile.style.marginTop = "0";
    }, index * 200);
  });


  if (teamBlueScore != 0 || teamRedScore != 0) {
    return;
  } else {
    switchTurns();
  }
}

function shuffleStartTurn() {
  overlay.style.display = "block";
  const maxCalls = 15;
  const totalDelay = 1200;
  const randomNumberOfCalls = Math.floor(Math.random() * maxCalls) + 1;
  const delayBetweenCalls = totalDelay / randomNumberOfCalls;
  let currentCall = 0;

  drumRoll.play();

  function makeCall() {
    if (currentCall < randomNumberOfCalls) {
      switchTurns();
      currentCall++;
      setTimeout(makeCall, delayBetweenCalls);
    } else {
      overlay.style.display = "none";

    }
  }

  makeCall();

}

function isValidYouTubeUrl(url) {
  // Regular expression pattern for matching YouTube video URLs
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})$/;
  return pattern.test(url);
}

function addToSelectedCategories(category) {
  selectedCategories.push(category);
}

function removeFromSelectedCategories(category) {
  const index = selectedCategories.indexOf(category);
  if (index !== -1) {
    selectedCategories.splice(index, 1);
  }
}

function isSelected(category) {
  return selectedCategories.includes(category);
}