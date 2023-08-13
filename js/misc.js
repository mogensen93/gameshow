// vars
let turn = "blue";
let blueTurn = document.querySelector("#blueTurn");
let redTurn = document.querySelector("#redTurn");
let blueColor = "#1267C8";
let redColor = "#ff5c5c";
let totalGameCards;
let cardsPlayed = 0;
let scoresData = [];
let isOverlayVisible = false;
let selectedCategories = [];
let games = []
let numberOfgames = 10;

//global queryselectors
const introScreen = document.querySelector(".introScreen")
const gameScreen = document.querySelector(".gameScreen");
const preGameScreen = document.querySelector(".preGameScreen");
const afterGameScreen = document.querySelector(".afterGameScreen");
const settings = document.querySelector(".settings")
const activeCardContainer = document.querySelector(".activeCard");
const scoreContainer = document.querySelector(".score-container");
const overlay = document.getElementById("overlay");

// Music
const introMusic = new Audio("../sound/intro.mp3");
const gameMusic = new Audio("../sound/gameMusic.mp3");
const click = new Audio("../sound/click.mp3");
const openAction = new Audio("../sound/open.wav");
const pointGiven = new Audio("../sound/pointGiven.wav");
const flipCard = new Audio("../sound/flipCard.mp3");
const cardDone = new Audio("../sound/cardDone.mp3");
const drumRoll = new Audio("../sound/drumroll.mp3")
const gameHasEndedSound = new Audio("../sound/gameHasEndedSound.wav");

// Retrieve scores from localStorage on page load
const teamBlueScoreElement = document.getElementById("teamBlueScore");
const teamRedScoreElement = document.getElementById("teamRedScore");
let teamBlueScore = parseInt(localStorage.getItem("teamBlueScore")) || 0;
let teamRedScore = parseInt(localStorage.getItem("teamRedScore")) || 0;

// Update the score elements with the initial values
teamBlueScoreElement.textContent = teamBlueScore;
teamRedScoreElement.textContent = teamRedScore;

