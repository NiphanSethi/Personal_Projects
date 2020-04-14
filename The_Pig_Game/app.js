/* Entire JavaScript Document Written By: Niphan Sethi, Last Edited: 19/01/2020 11:36 (GMT +7) */

var scores, roundScore, activePlayer, winnerDetected, winningScoreInput;

//initializing all variables appropriately
resetVariables();

//initialize game when webpage loads
initializeNewGame();

//defining an event listener for entering winning score and starting game
document.querySelector(".btn-startGame").addEventListener("click", startBtn);
//defining an event listener for pressing new game button
document.querySelector(".btn-new").addEventListener("click", newGameBtn);
//defining an event listener for pressing roll dice button
document.querySelector(".btn-roll").addEventListener("click", rollBtn);
//defining an even listener for pressing hold button
document.querySelector(".btn-hold").addEventListener("click", holdBtn);


/***************************************************************************************/

function startBtn() {

    winningScoreInput = document.querySelector(".final-score").value;

    if (winningScoreInput) {
        manipulateGameButtons("block");
        initiateGame("none");
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
        document.querySelector(".errorMessage").style.display = "none";
    } else {
        document.querySelector(".errorMessage").style.display = "block";
    }

}

/***************************************************************************************/

function newGameBtn() {

    initializeNewGame();
    resetVariables();
    //allow players to re-enter winning score before next game begins
    manipulateGameButtons("none");
    initiateGame("block");

}

/***************************************************************************************/

function rollBtn() {

    if (!winnerDetected) {
        //generate random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //display result
        var diceDisplay = document.querySelector(".dice");
        diceDisplay.style.display = "block";
        //selecting image
        diceDisplay.src = "res/dice-" + dice + ".png";
        //update round score if rolled number is not 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } 
        //if 1 is rolled, set current score back to zero and change player
        else {
            roundScore = 0;
            document.getElementById("current-" + activePlayer).textContent = "0";
            changePlayer();
        }
    }

}

/***************************************************************************************/

function holdBtn() {

    //if no winner is detected or the hold button has been pressed without
    //a roll of the dice this round, do nothing...

    if (!winnerDetected && roundScore != 0) {

        scores[activePlayer] += roundScore;
        roundScore = 0;

        //set current score to zero
        document.getElementById("current-" + activePlayer).textContent = "0";
        //update round score
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        //check if any player has won the game already
        determineWinner();

        //prevent the other player from continuing game once a winner has been detected
        if (!winnerDetected) {
            changePlayer();
        }
    }

}

/***************************************************************************************/

function initiateGame(dispOption) {

    document.querySelector(".btn-startGame").style.display = dispOption;
    document.querySelector(".final-score").style.display = dispOption;

}

/***************************************************************************************/

function changePlayer() {

    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    
    //if currently player 1, then change to player 0, vice versa...
    if (activePlayer) {
        activePlayer = 0;
    } else {
        activePlayer = 1;
    }

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
}

/***************************************************************************************/

function initializeScoresToZero() {

    //set total round scores of each player to zero
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    //set current score of each player to zero
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

}

/***************************************************************************************/

function initializeNewGame() {

    //setting all scores to zero initially
    initializeScoresToZero();
    //dice should not be visible upon new game/when webpage loads
    document.querySelector(".dice").style.display = "none";
    //remove winner class from player
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
    //reset all elements and classes to their initial state
    activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    //reset winner to the original player name
    resetPlayerNames();
    //allow players to re-enter a new winning score for next round (hide neccessary buttons)
    manipulateGameButtons("none");

}

/***************************************************************************************/

function manipulateGameButtons(displayFeature) {

    document.querySelector(".btn-new").style.display = displayFeature;
    document.querySelector(".btn-roll").style.display = displayFeature;
    document.querySelector(".btn-hold").style.display = displayFeature;

}

/***************************************************************************************/

function determineWinner() {

    //if a player wins, change their panel to the respective winner aesthetic
    if (scores[activePlayer] >= winningScoreInput) {
        setWinnerAesthetic();
        winnerDetected = true;
    }

}

/***************************************************************************************/

function setWinnerAesthetic() {

    document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector(".dice").style.display = "none";

}

/***************************************************************************************/

function resetPlayerNames() {

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

}

/***************************************************************************************/

function resetVariables() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winnerDetected = false;
    //reset winning score input field to empty string
    document.querySelector(".final-score").value = "";
    document.querySelector(".errorMessage").style.display = "none";

}

/***************************************************************************************/