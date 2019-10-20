// TODO: make a object for players.
var playerScoreElements, playerRoundScoreElements, playerNameElements, playerPanelElements;
var playerScores, diceAccuScore, goal;
var dice1, dice2, lastDiceNum, activePlayer;
var buttonNewGame, buttonRoll, buttonHold;
var infoBox;


// Player Score
playerScoreElements = [document.getElementById('score-0'), document.getElementById('score-1')];
// Player Round Score
playerRoundScoreElements = [document.getElementById('current-0'), document.getElementById('current-1')];
// Player Name
playerNameElements = [document.getElementById('name-0'), document.getElementById('name-1')];
// Player Panel
playerPanelElements = [document.querySelector('.player-0-panel'), document.querySelector('.player-1-panel')];

// Buttons
buttonNewGame = document.querySelector('.btn-new');
buttonRoll = document.querySelector('.btn-roll');
buttonHold = document.querySelector('.btn-hold');

//infoBox
infoBox = document.getElementById("info-box");



function newGame() {
    // Ask for goal
    goal = undefined;
    while (!Number.isInteger(goal) || goal <= 0) {
        goal = parseInt(prompt("Please set the winning score:", "100"));
    }
    pageInit();

    // Roll Dice & Hold button
    buttonHold.style.display = 'block';
    buttonRoll.style.display = 'block';
}

function pageInit(){
    // render all text field

    // hide 2 buttons below, only show newGame button. 
    // Player Text
    playerNameElements[0].textContent = 'PLAYER 1';
    playerNameElements[1].textContent = 'PLAYER 2';

    // Player Score
    playerScoreElements[0].textContent = 0;
    playerScoreElements[1].textContent = 0;

    playerScores = [0, 0];

    // Player Current Score
    playerRoundScoreElements[0].textContent = 0;
    playerRoundScoreElements[1].textContent = 0;

    // Dice
    dice1 = document.getElementById('dice1');
    dice1.style.display = 'none';

    dice2 = document.getElementById('dice2');
    dice2.style.display = 'none';

    // Active player
    activePlayer = 0;
    playerPanelElements[0].classList.add('active');
    playerPanelElements[1].classList.remove('active');

    diceAccuScore = 0;

    // Roll Dice & Hold button
    buttonHold.style.display = 'none';
    buttonRoll.style.display = 'none';

    // info box
    infoBox.style.display = 'none';
}

function getRandomDiceNum() {
    return (Math.floor(Math.random() * 10 % 6) + 1);
}

function nextPlayer() {
    infoBox.style.display = 'block';
    buttonRoll.style.display = 'none';
    buttonHold.style.display = 'none';

    setTimeout(function() {
        infoBox.style.display = 'none';
        dice1.style.display = 'none';
        dice2.style.display = 'none';

        buttonRoll.style.display = 'block';
        buttonHold.style.display = 'block';
    }, 1000);

    lastDiceNum = undefined;

    diceAccuScore = 0;
    playerRoundScoreElements[activePlayer].textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

pageInit();
buttonNewGame.addEventListener('click', newGame);

// Button: Roll Dice
buttonRoll.addEventListener('click', function(){
    dice1.style.display = 'block';
    var dice1Num = getRandomDiceNum();
    dice1.src = './dice-' + dice1Num + '.png';

    dice2.style.display = 'block';
    var dice2Num =  getRandomDiceNum();
    dice2.src = './dice-' + dice2Num + '.png';

    if (dice1Num !== 1 && dice2Num !== 1){
        diceAccuScore += (dice1Num + dice2Num);
        playerRoundScoreElements[activePlayer].textContent = diceAccuScore;
        
        if (diceAccuScore + playerScores[activePlayer] >= goal) {
            playerScoreElements[activePlayer].textContent = diceAccuScore + playerScores[activePlayer];
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';

            // hide roll-Dice and hold button
            buttonHold.style.display = 'none';
            buttonRoll.style.display = 'none';
        }
    } else {
        nextPlayer();
    }
});

// Button: Hold
buttonHold.addEventListener('click', function() {
    playerScores[activePlayer] += diceAccuScore;
    playerScoreElements[activePlayer].textContent = playerScores[activePlayer];
    
    dice1.style.display = 'none';
    dice2.style.display = 'none';
    nextPlayer();
})