/* AFTER GAME */

function showAfterGameScreen(pointRule, title) {
    createScoreEntryLocalStorage(title)
    appendPointRule(pointRule)
    showAfterGameContainer();
    localStorage.setItem("current-round", cardsPlayed);
    activeCardContainer.style.transform = 'translate(-2000px)';
    cardDone.play();
}

function closeAfterGameScreen() {
    cardsPlayed = cardsPlayed + 1;
    hideAfterGameContainer();
    if (totalGameCards === cardsPlayed) {
        gameHasEnded();
    } else {
        toggleOverlay();
        switchTurns();
        cardDone.pause();
        cardDone.currentTime = 0;
        gameMusic.play();
    }
}

function appendPointRule (pointRule) {
    const points = document.querySelector(".aftergame-points");
    points.innerText = pointRule;

}


function createScoreEntryLocalStorage(title) {
    scoreData = {
        id: title,
        blueScore: 0,
        redScore: 0,
    };

    scoresData.push(scoreData);
}

function showAfterGameContainer(){
    afterGameScreen.style.opacity= "1";
    afterGameScreen.style.transform= "translateX(0px)";
    scoreContainer.style.zIndex = "200";
}

function hideAfterGameContainer(){  
    scoreContainer.style.zIndex = "1";
    afterGameScreen.style.opacity= "0";
    afterGameScreen.style.transform= "translateX(-2000px)";
}