function gameHasEnded(){
    gameHasEndedSound.play();
    createGraph();
    blueTurn.style.zIndex="0";
    redTurn.style.zIndex="0";
    document.querySelector("#gameHasEnded").style.display = "block";
    const endScore = findWinningTeam(teamBlueScore, teamRedScore);

    if(endScore.winner == 'tie'){
        document.querySelector("#winner").innerText = `Uafgjort?!`
        document.querySelector("#winner-score").innerText = `Med en score på ${teamBlueScore}`;

    } else {
        document.querySelector("#winner").innerText = `Og vinderen er ${endScore.winner}!`
        document.querySelector("#winner-score").innerText = `Med en score på ${endScore.winnerScore}, det er ${endScore.winnerScore - endScore.loserScore} points mere end ${endScore.loser}`

    }

    console.log("The winning team is:", endScore.winner, "with a score of", endScore.winnerScore);
}

function findWinningTeam(blueScore, redScore) {
    if (blueScore === redScore) {
      return { winner: 'tie' };
    } else {
      return blueScore > redScore ? { winnerScore: blueScore, winner: 'Blå', loserScore: redScore, loser: 'Rød' } : { winnerScore: redScore, winner: 'Rød', loserScore: blueScore, loser: 'Blå' };
    }
  }