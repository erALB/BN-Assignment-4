var newGame = false;
var playerSelection;
var computerSelection;
var playerScore = 0;
var computerScore = 0;
var playerDisplay = document.getElementById("player");
var computerDisplay = document.getElementById("computer");
var roundDisplay = document.getElementById("roundResult");
var winnerDisplay = document.getElementById("winner");
var options = ["rock", "paper", "scissors"];
var optionButtons = document.getElementsByClassName("selection");

var playButton = document.getElementById("play");
playButton.addEventListener("click", startRound);

function computerPlay() {
	return options[Math.floor(Math.random() * options.length)];
}

function enableOptionButtons() {
  if (newGame) {
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].addEventListener("click", playRound);
    }
  } else {
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].removeEventListener("click", playRound);
    }
  }
}

function showResults(winner) {
  winnerDisplay.innerHTML = `${winner} wins!`;
  playButton.innerHTML = "Play again?";
  document.getElementById("game").appendChild(playButton);
  newGame = false;
  enableOptionButtons();
}

function playRound() {
  playerSelection = this.id;
  computerSelection = computerPlay();
	document.getElementById("computerSelection").innerHTML = `Computer selected: ${computerSelection}`;
	if ( 
    (playerSelection === "rock" && computerSelection === "scissors") || 
    (playerSelection === "paper" && computerSelection === "rock") || 
    (playerSelection === "scissors" && computerSelection === "paper") 
  ) {
    roundDisplay.innerHTML = `You win! ${playerSelection} beats ${computerSelection}`;
    playerScore++;
    playerDisplay.innerHTML = `Player score: ${playerScore}`;
  } else if (
    (computerSelection === "rock" && playerSelection === "scissors") || 
    (computerSelection === "paper" && playerSelection === "rock") || 
    (computerSelection === "scissors" && playerSelection === "paper") 
  ) {
    roundDisplay.innerHTML = `You lose! ${computerSelection} beats ${playerSelection}`;
    computerScore++;
    computerDisplay.innerHTML = `Computer score: ${computerScore}`;
  } else if (playerSelection === computerSelection) roundDisplay.innerHTML = "Tie!"; 
  else {
    alert("Invalid input, try again!");
    return 0;
  }
  if (playerScore == 5) {
    showResults("Player");
  } else if (computerScore == 5) {
    showResults("Computer");
  }
}

function startRound() {
  newGame = true;
  playerScore = 0;
  computerScore = 0;
  winnerDisplay.innerHTML = " ";
  document.getElementById("computerSelection").innerHTML = " ";
  roundDisplay.innerHTML = " ";
  playerDisplay.innerHTML = `Player score: ${playerScore}`;
  computerDisplay.innerHTML = `Computer score: ${computerScore}`;
  document.getElementById("game").removeChild(playButton);
  enableOptionButtons();
}