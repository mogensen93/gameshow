function showSettings() {
  gameMusic.pause();

  settings.style.opacity = "1";
  settings.style.transition = "transform 0.5s ease";
  settings.style.transform = "translateX(0)";
  settings.style.height = "500px";

    scoreContainer.style.zIndex = "200";
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
  
    // Create teams divs
    const playerListTeamBlue = document.createElement("div");
    playerListTeamBlue.classList.add("playerlistTeamBlue");
    const playerListTeamRed = document.createElement("div");
    playerListTeamRed.classList.add("playerlistTeamRed");
  
    playerList.appendChild(playerListTeamBlue);
    playerList.appendChild(playerListTeamRed);
  
    // Retrieve players array from localStorage
    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.forEach((player) => {
      const playerName = player.name;
      const listItem = document.createElement("p");
      listItem.textContent = playerName;
  
      // Assign class based on team
      if (player.team == 'Team Blue') {
        playerListTeamBlue.appendChild(listItem);
      } else {
        playerListTeamRed.appendChild(listItem);
      }
    });
  
    toggleOverlay();
  
  }
  
  function closeSettings() {
    settings.style.transform = "translateX(2000px)"; // or any other position to hide
    setTimeout(() => {
      settings.style.height = "0";
      settings.style.opacity = "0";
      scoreContainer.style.zIndex = "1";

      toggleOverlay();

    }, 300);
    gameMusic.play();
  }