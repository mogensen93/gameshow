// RESET 
function resetGame() {
  localStorage.clear();
  location.reload();
}

function resetScores() {
  teamBlueScore = 0;
  teamRedScore = 0;
  teamBlueScoreElement.textContent = teamBlueScore;
  teamRedScoreElement.textContent = teamRedScore;
  localStorage.setItem("teamBlueScore", teamBlueScore);
  localStorage.setItem("teamRedScore", teamRedScore);
}

// OVERLAY   
function toggleOverlay() {
  if (isOverlayVisible) {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "flex";
  }
  isOverlayVisible = !isOverlayVisible;
}

// TURNS 
function switchTurns() {
  if (turn === "blue") {
    blueTurn.style.display = "none";
    redTurn.style.display = "block";
    redTurn.style.backgroundColor = redColor;
    document.body.classList.add('gradiantRed');
    document.body.classList.remove('gradiantBlue');
    turn = 'red';
  } else {
    blueTurn.style.display = "block";
    redTurn.style.display = "none";
    redTurn.style.backgroundColor = blueColor;
    document.body.classList.add('gradiantBlue');
    document.body.classList.remove('gradiantRed');
    turn = "blue";
  }
}

function enableMusic() {
  introMusic.play();
}

// YOUTUBE 

function createYouTubePlayer(url) {
  const playerContainer = document.createElement('div');

  // Create iframe element for the YouTube video
  const iframe = document.createElement('iframe');
  iframe.width = "99%";
  iframe.height = "500px";
  iframe.src = `https://www.youtube.com/embed/${getYouTubeVideoId(url)}`;
  iframe.setAttribute('allowfullscreen', true );
  iframe.setAttribute('allow', "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
  iframe.allowfullscreen = true;

  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  // Append the iframe to the player container
  playerContainer.appendChild(iframe);

  // Append the player container to the document body
  document.body.appendChild(playerContainer);
  return iframe;
}

function getYouTubeVideoId(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
}