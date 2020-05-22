// Global HTML-elements
const staticContentEls = document.querySelectorAll(".static");
const startPageEl = document.querySelector("#startPage");
const startPagePlayButtonEl = document.querySelector("#startPagePlayButton");
const audioButtonEl =  document.querySelector("#audioButton");
const audioButtonImgEl =  document.querySelector("#audioButtonImg");
const mainMenuPageEl = document.querySelector("#mainMenuPage");
const numOfPlayersButtons = document.querySelectorAll(".numOfPlayersRadio");
const difficultySliderWrapper = document.querySelector("#difficultySliderWrapper");
const difficultySlider = document.querySelector("#difficultySlider");
const gamePageEl = document.querySelector("#gamePage");
const playButtonEl = document.querySelector("#playButton");
const menuButtonEl = document.querySelector("#menuButton");
const pointsToWinEl = document.querySelector("#pointsToWin");
const snake1pointsEl = document.querySelector("#snake1points");
const snake2pointsEl = document.querySelector("#snake2points");
const player1keysWrapper = document.querySelector("#leftSideInfo .keysWrapper");
const player2keysWrapper = document.querySelector("#rightSideInfo .keysWrapper");
const gameAreaTextEl = document.querySelector("#gameAreaText");
const gameAreaEl = document.querySelector("#gameArea");
const ctx = gameAreaEl.getContext("2d");

const backgroundMusicEl = document.querySelector("#backgroundMusic");
const backgroundMusicVolume = 0.3;
backgroundMusicEl.volume = backgroundMusicVolume;

const hitSFX = document.querySelector("#hitSFX");
const biteSFX = document.querySelector("#biteSFX");
const turnSFX = document.querySelector("#turnSFX");
turnSFX.volume = 0.3;
const pointSFX = document.querySelector("#pointSFX");
const winSFX = document.querySelector("#winSFX");

const appleImg = document.querySelector("#appleImg");

// Other global variables
let game;
let isSound = true;

/*----------------------------------------------------------------------------------------*/

// Add event listeners
startPagePlayButtonEl.addEventListener("click", startPagePlayButtonClick);
audioButtonEl.addEventListener("click", audioButtonClick);
playButtonEl.addEventListener("click", startNewGame);
menuButtonEl.addEventListener("click", backToMenu);
numOfPlayersButtons.forEach((btn) => btn.addEventListener("click", toggleDifficulty));

/*----------------------------------------------------------------------------------------*/

// Functions

/*
    Starts the background music
    hides start page and shows main menu
*/
function startPagePlayButtonClick(){
    backgroundMusicEl.play();
    startPageEl.style.display = "none";
    mainMenuPageEl.style.display = "flex";
    staticContentEls.forEach(el => el.style.display = "flex");
}

/*
    Toggles the audio button image, the background music volume and the boolean variable isSound
*/
function audioButtonClick(){
    if(isSound){
        audioButtonImgEl.src = "pictures/no-audio.png";
        backgroundMusicEl.volume = 0;
    }else{
        audioButtonImgEl.src = "pictures/audio.png";
        backgroundMusicEl.volume = backgroundMusicVolume;
    }
    isSound = !isSound;
}

/*
    Hides the main menu and shows the game page
    Gets settings from main menu
    Starts a new game
*/
function startNewGame(){
    mainMenuPageEl.style.display = "none";
    gamePageEl.style.display = "flex";

    const numOfPlayers = Number(document.querySelector("#numOfPlayersWrapper").querySelector("input[type=radio]:checked").value);

    const snake1colourString = document.querySelector("#player1colour").querySelector("input[type=radio]:checked").value;
    const snake2colourString = document.querySelector("#player2colour").querySelector("input[type=radio]:checked").value;
    const colours = {
        red : "#FF0000",
        green : "#00FF00",
        blue : "#0000FF"
    };
    const snake1colour = colours[snake1colourString];
    const snake2colour = colours[snake2colourString];

    const difficulty = Number(document.querySelector("#difficultySlider").value); // Range [0, 2]
    const newPathModuloDivisor = 3 - difficulty; // Range [1, 3]

    const gameAreaSize = Number(document.querySelector("#gameAreaSlider").value); // Range [1, 5]
    const colOptions = [8, 12, 16, 24, 36];
    const rowOptions = [6, 9, 12, 18, 27];
    const columns = colOptions[gameAreaSize];
    const rows = rowOptions[gameAreaSize];

    const updateFrequencyIndex = Number(document.querySelector("#speedSlider").value); // Range [0, 4]
    const updateFrequencyOptions = [1, 2, 4, 8, 16];
    const updateFrequency = updateFrequencyOptions[updateFrequencyIndex];

    const pointsToWinIndex = Number(document.querySelector("#pointsToWinSlider").value); // Range [0, 4]
    const pointsToWinOptions = [1, 3, 5, 10, Infinity];
    const pointsToWin = pointsToWinOptions[pointsToWinIndex];

    game = new Game(numOfPlayers, snake1colour, snake2colour, newPathModuloDivisor, columns, rows, updateFrequency, pointsToWin);
}

/*
    Stops game
    Hides game page and shows main menu
*/
function backToMenu(){
    game.selfDestruct();
    gamePageEl.style.display = "none";
    mainMenuPageEl.style.display = "flex";
}

/*
    Parameters:
        e: click event

    Hides difficulty slider if 2 player is chosen
*/
function toggleDifficulty(e){
    const numOfPlayers = Number(e.target.value);
    if(numOfPlayers === 2){
        difficultySliderWrapper.style.opacity = "0.4";
        difficultySlider.disabled = true;
        difficultySlider.classList.remove("sliderHover");
        difficultySlider.style.cursor = "default";
    }else{
        difficultySliderWrapper.style.opacity = "1";
        difficultySlider.disabled = false;
        difficultySlider.classList.add("sliderHover");
        difficultySlider.style.cursor = "pointer";
    }
}

/*
    Parameters:
        sfx: audio element

    Plays sfx if sound on
*/
function playSFX(sfx){
    if(isSound) {
        sfx.currentTime = 0;
        sfx.play();
    }
}

/*
    Parameters:
        element: HTML-element to bounce
        animationDuration: Duration of animation

    Adds the css-animation "bounce" to the element with animationDuration as duration
    Removes the css-animation when the animation is done
*/
function bounce(element, animationDuration){
    element.style.animationName = "bounce";
    element.style.animationDuration = animationDuration + "ms";

    setTimeout(() => {
        element.style.animationName = "";
    }, animationDuration);
}