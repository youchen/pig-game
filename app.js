// TODO: make a object for players.
var playerScoreElements, playerRoundScoreElements, playerNameElements, playerPanelElements;
var playerScores, diceAccuScore, goal;
var dice, lastDiceNum, activePlayer;
var buttonRollDice, buttonHold, buttonNewGame;

// goal = -1;

// Buttons
buttonNewGame = document.querySelector('.btn-new');
buttonRollDice = document.querySelector('.btn-roll');
buttonHold = document.querySelector('.btn-hold');

buttonNewGame.addEventListener('click', init);

// Player Name
playerNameElements = [document.getElementById('name-0'), document.getElementById('name-1')];

// Player Score
playerScoreElements = [document.getElementById('score-0'), document.getElementById('score-1')];

// Player Round Score
playerRoundScoreElements = [document.getElementById('current-0'), document.getElementById('current-1')];

// Player Panel
playerPanelElements = [document.querySelector('.player-0-panel'), document.querySelector('.player-1-panel')];

function init() {
    // Ask for goal
    goal = undefined;
    while (!Number.isInteger(goal) || goal <= 0) {
        goal = parseInt(prompt("Please set the winning score:", "100"));
    }

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
    dice = document.querySelector('.dice');
    dice.style.display = 'none';

    // Active player
    activePlayer = 0;
    playerPanelElements[0].classList.add('active');
    playerPanelElements[1].classList.remove('active');

    diceAccuScore = 0;

    // Roll dice & Hold button
    buttonHold.style.display = 'block';
    buttonRollDice.style.display = 'block';
}

init();

// Button: Roll dice
buttonRollDice.addEventListener('click', function(){
    // var diceNum = (Math.floor(Math.random() * 10 % 6) + 1);
    var diceNum = 6;

    dice.style.display = 'block';
    dice.src = './dice-' + diceNum + '.png';

    // if not 1, continue, add the score to current socre
    // if it's one, alternate the player, clear the score
    if (diceNum !== 1){
        if (lastDiceNum === 6 && diceNum === 6) {
            playerScores[activePlayer] = 0;
            playerScoreElements[activePlayer].textContent = 0;
            playerRoundScoreElements[activePlayer].textContent = 0;
            diceAccuScore = 0;
    
            nextPlayer();
            dice.style.display = 'none';
            return;
        } 
        diceAccuScore += diceNum;
        playerRoundScoreElements[activePlayer].textContent = diceAccuScore;
        
        if (diceAccuScore + playerScores[activePlayer] >= goal) {
            playerScoreElements[activePlayer].textContent = diceAccuScore + playerScores[activePlayer];
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';

            // hide roll-dice and hold button
            buttonHold.style.display = 'none';
            buttonRollDice.style.display = 'none';

            // remove the Active Dot
            // document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        }
    } else {
        nextPlayer();
    }
    lastDiceNum = diceNum;
    console.log("last: " + lastDiceNum);
    console.log("curr: " + diceNum);
});

function nextPlayer() {
    lastDiceNum = undefined;

    diceAccuScore = 0;
    playerRoundScoreElements[activePlayer].textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Button: Hold
buttonHold.addEventListener('click', function() {
    playerScores[activePlayer] += diceAccuScore;
    playerScoreElements[activePlayer].textContent = playerScores[activePlayer];
    
    dice.style.display = 'none';
    nextPlayer();
})