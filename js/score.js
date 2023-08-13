
function incrementScore(team) {
    if (team === "teamBlue") {
      teamBlueScore++;
      teamBlueScoreElement.textContent = teamBlueScore;
      showPointGiven(team, "+")

    } else if (team === "teamRed") {
      teamRedScore++;
      teamRedScoreElement.textContent = teamRedScore;
      showPointGiven(team, "+")

    }


    scoreData.redScore = teamRedScore;
    scoreData.blueScore = teamBlueScore;
    localStorage.setItem("teamBlueScore", teamBlueScore);
    localStorage.setItem("teamRedScore", teamRedScore);


    localStorage.setItem("status", JSON.stringify(scoresData));
    playPointGiven();
  }
  
  function decrementScore(team) {
    if (team === "teamBlue") {
      teamBlueScore--;
      teamBlueScoreElement.textContent = teamBlueScore;
      localStorage.setItem("teamBlueScore", teamBlueScore);
      scoreData.minusBlueScore = teamRedScore;
      showPointGiven(team, "-")

    } else if (team === "teamRed") {
      teamRedScore--;
      teamRedScoreElement.textContent = teamRedScore;
      localStorage.setItem("teamRedScore", teamRedScore);
      scoreData.minusRedScore = teamRedScore;
      showPointGiven(team, "-")

    }

    
    localStorage.setItem("status", JSON.stringify(scoresData));
    playPointGiven()
  }


  function playPointGiven(){
    pointGiven.currentTime = 0;
    pointGiven.play();
  }

  
  function showPointGiven(team, type) {
    const typeOfPointText = document.createElement('div');
    typeOfPointText.textContent = `${type}1`;

    typeOfPointText.classList.add('text-bubble', 'wiggle');

    if(team == 'teamBlue'){
      typeOfPointText.style.backgroundColor = blueColor;
      document.querySelector("#increment-blue").appendChild(typeOfPointText);
    } else {
      typeOfPointText.style.backgroundColor = redColor;
      document.querySelector("#increment-red").appendChild(typeOfPointText);
    }
  
    setTimeout(() => {
      typeOfPointText.remove();
    }, 2000);
  }