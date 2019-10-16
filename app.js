/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game start state
// Player Score
var playerScores = [document.querySelector('#score-0'), document.querySelector('#score-1')];
playerScores[0].textContent = 0;
playerScores[1].textContent = 0;

// Player Current Score
var playerCurScores = [document.querySelector('#current-0'), document.querySelector('#current-1')];
playerCurScores[0].textContent = 0;
playerCurScores[1].textContent = 0;

// Dice
var dice = document.querySelector('.dice').style.display = 'none';

var scoreCandidate, dice;
scoreCandidate = 0;
dice = Math.floor(Math.random() * 10 % 6) + 1;

document.querySelector('current-0')