
// NPM packages that are required

var inquirer = require("inquirer");
var chalk = require('chalk');

// The word.js file will be required (with the word.js file requiring the letter.js file also)

var Word = require("./word.js");

// Variable used to determine win/loss state and track guesses

var guesses = 10;
var points = 0;

// Target words that a user will guess

var targetWords = ["Iron Man", "Captain America", "Hulk", "Thor", "Spider-Man", "Black Widow", "Black Panther",
    "Hawkeye", "Captain Marvel", "Scarlet Witch", "Doctor Strange", "Drax the Destroyer", "Groot", "Gamora", "Rocket Raccoon", "Star-Lord"];

// Rules for game play

var gamePlay =
    "     Welcome to the game! The object of the game is to guess the Marvel Cinematic Universe Character!" + "\r\n" +
    "     ***********************************************************************************************************" + "\r\n" +
    "     You can press any letter, A-Z, on the keyboard when prompted to guess a letter." + "\r\n" +
    "     When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
    "     You will be given 10 chances to guess the word." + "\r\n" +
    "     If incorrect:" + "\r\n" +
    "     The guessed letter does not appear in the word and the number of guesses remaining decreases by 1." + "\r\n" +
    "     If correct:" + "\r\n" +
    "     The letter you guessed appears in the word." + "\r\n" +
    "     You WIN if:" + "\r\n" +
    "     You correctly guess all the letters for five words before the number of guesses remaining reaches 0." + "\r\n" +
    "     You LOSE if:" + "\r\n" +
    "     You run out of guesses before the entire word is revealed." + "\r\n" +
    "     But don't worry, you will be asked if you wish to play again whether you win or lose." + "\r\n" +
    "     ***********************************************************************************************************" + "\r\n" +
    "     If you need to exit the game at any time, you can do so by pressing Ctrl + C on your keyboard." + "\r\n" +
    "     ***********************************************************************************************************" + "\r\n" +
    "     Now let's play!"

// Function to start game play

function beginGame() {
    console.log(chalk.white(gamePlay));
}

// Function for generating a random word from the target word list and uses the Word constructor to store the word

function randomWordChosen() {
    randomWord = targetWords[Math.floor(Math.random() * targetWords.length)]

    wordChosen = new Word(randomWord);
}

function guessWord() {
    if (guesses > 0 && points < 5) {

        console.log(wordChosen.display());

        //  Prompts the user for each guess and keeps track of the user's remaining guesses

        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }
            }
        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            wordChosen.checkGuess(guess);

            // If guessed letter is incorrect, decrements the number of guesses by 1 and alerts player it is incorrect

            if (randomWord.toUpperCase().indexOf(guess.toUpperCase()) === -1) {
                guesses--;
                console.log(chalk.red("Oops, that is not correct! " + guesses + " guesses left"))
            }

            // Otherwise it alerts the player that the letter guessed was correct

            else {
                if (points < 5) {
                    console.log(chalk.blue("That is correct!"))
                }
            }

            // If the word was guessed correctly, then this will advance the play to the next word

            if (randomWord.trim() === wordChosen.display().trim()) {
                console.log(wordChosen.display());
                guesses = 10;
                points++;
                if (points < 5) {
                    console.log(chalk.cyanBright("That is correct! Next character!"));
                    randomWordChosen();
                }

                // If the points are greater than five, it will start the winGame state

                else {
                    winGame();
                }
            }

            // If the player has no more guesses, then it will start the loseGame state

            if (guesses === 0) {
                loseGame();
            }

            guessWord();
        });
    }
}

// LoseGame state, prompts player if they wish to play again

function loseGame() {
    console.log(chalk.cyanBright("Game over man, game over!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play another round?",
            default: true
        }

        // If player wishes to play again, the stats are reset and new word is randomly selected

    ]).then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            guesses = 10;
            points = 0;
            randomWordChosen();
            guessWord();
        }

        // If player does not wish to play again, the player is removed from the file execution and placed back to the command line

        else {
            console.log(chalk.yellow("That is okay, come back again when you feel worthy."));
            process.exit();
        }
    })
}

// WinGame state, prompts player if they wish to play again

function winGame() {
    console.log(chalk.cyanBright("You won!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play another round?",
            default: true
        }

        // If player wishes to play again, the stats are reset and new word is randomly selected

    ]).then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            guesses = 10;
            points = 0;
            randomWordChosen();
            guessWord();
        }

        // If player does not wish to play again, the player is removed from the file execution and placed back to the command line

        else {
            console.log(chalk.yellow("That is okay, come back again when you feel worthy."));
            process.exit();
        }
    })
}

beginGame();
randomWordChosen();
guessWord();