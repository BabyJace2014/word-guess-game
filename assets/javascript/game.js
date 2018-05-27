//Grab reference to my DOM Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

//Create variables for game (wordBNank, wins, picked word, guesses left, game running, picked word placeholder, guessed letterbank, incorrect letter bank)
var wordBank = ['Field Goal', 'Wide Receiver', 'Tight End', 'Running Back', 'Quarterback', 'Penalty', 'Tackle', 'Pass Interference', 'Fumble', 'Offense', 'Defense', 'Touchdown', 'Safety', 'Interception'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];



// newGame function to reset all stats, pick new word and create placeholders
function newGame() {
    //Reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    // Pick a new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create placeholders out of new pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }


    // Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
}
// letterGuess funtion, takes in the letter you pressed and sees if its in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // Run Game Logic
        guessedLetterBank.push(letter);

        // Check if guessed letter is in the picked word
        for (var i = 0; i < pickedWord.length; i ++) {
            // Convert both values to lower case so I can comparte them
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // If a match, swap out that character in the placeholder with the actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        // Pass letter into checkIncorrect function
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("The game isn't running, click on the Start New Game button to start over.");
        } else{
            alert("You've already guessed this letter, guess a new one!");
        }
    }
}
// checkIncorrect(letter)
function checkIncorrect(letter) {
   // Check if the letter guessed did not make it into the pickedWordPlaceholder
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        // Decrement guesses left
        guessesLeft --;
        // Add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        // Write new bank of incorrct letters guessed to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // Write new amount of guessed left to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
        losses ++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
        alert("Sorry You Lost!, Click Start A New Game to Play Again");

    }
    checkWin();
}

// checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        wins ++;
        gameRunning = false;
        $wins.textContent = wins;
        alert("CONGRADULATIONS, You Win! Click Start A New Game to Play Again");
    }

    
}


//Add event listener for new game button
$newGameButton.addEventListener('click', newGame);

//Add onkeyup event to triggert letterGuess
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}