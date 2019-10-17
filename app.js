/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var playerScores, scores, playerCurScores, dice, activePlayer, roundScore, winnerScore;
var buttonRollDice, buttonHold, buttonNewGame;

winnerScore = 10;

// Buttons
buttonNewGame = document.querySelector('.btn-new');
buttonRollDice = document.querySelector('.btn-roll');
buttonHold = document.querySelector('.btn-hold');

buttonNewGame.addEventListener('click', init);

function init() {
    // Player Text
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    // Player Score
    playerScores = [document.getElementById('score-0'), document.getElementById('score-1')];
    playerScores[0].textContent = 0;
    playerScores[1].textContent = 0;

    scores = [0, 0];

    // Player Current Score
    playerCurScores = [document.getElementById('current-0'), document.getElementById('current-1')];
    playerCurScores[0].textContent = 0;
    playerCurScores[1].textContent = 0;

    // Dice
    dice = document.querySelector('.dice');
    dice.style.display = 'none';

    // Active player
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    roundScore = 0;

    // Roll dice & Hold button
    buttonHold.style.display = 'block';
    buttonRollDice.style.display = 'block';
}

init();

// Button: Roll dice

buttonRollDice.addEventListener('click', function(){
    if (document.getElementById('name-0').textContent === 'WINNER!!' || 
        document.getElementById('name-1').textContent === 'WINNER!!'
    ){
        document.getElementById('name-0').textContent = 'PLAYER 1';
        document.getElementById('name-1').textContent = 'PLAYER 2';
        init();
    }

    var diceNum = (Math.floor(Math.random() * 10 % 6) + 1);

    dice.style.display = 'block';
    dice.src = './dice-' + diceNum + '.png';

    // if not 1, continue, add the score to current socre
    // if it's one, alternate the player, clear the score
    if (diceNum !== 1){
        roundScore += diceNum;
        playerCurScores[activePlayer].textContent = roundScore;
        
        if (roundScore + scores[activePlayer] >= winnerScore) {
            playerScores[activePlayer].textContent = roundScore + scores[activePlayer];
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
});

function nextPlayer() {
    roundScore = 0;
    playerCurScores[activePlayer].textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}

// Button: Hold
buttonHold.addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    playerScores[activePlayer].textContent = scores[activePlayer];
    
    dice.style.display = 'none';
    nextPlayer();
})

