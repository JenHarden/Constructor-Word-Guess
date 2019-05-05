// index.js: The file containing the logic for the course of the game, which depends on `Word.js` and:

//  Randomly selects a word and uses the `Word` constructor to store it
//  Prompts the user for each guess and keeps track of the user's remaining guesses

var inquirer = require ("inquirer");
var Word = require ("./word.js");
var chalk = require ('chalk');

var guesses = 10;
var points = 0;

var targetWords = ["Iron Man", "Captain America", "Hulk", "Thor", "Spider-Man", "Black Widow", "Black Panther", 
"Hawkeye", "Captain Marvel", "Scarlet Witch", "Doctor Strange", "Drax the Destroyer", "Groot", "Gamora", "Rocket Raccoon", "Star-Lord"];

var randomWord;
var wordChosen;

var directions = 
"     Welcome to the game! The object of the game is to guess the Marvel Cinematic Universe Character!" + "\r\n" +
"     ===========================================================================================================" + "\r\n" +
"     You can press any letter, A-Z, on the keyboard when prompted to guess a letter." + "\r\n" +
"     When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
"     You will be given 10 chances to guess the word." + "\r\n" +
"     If incorrect:" + "\r\n" + 
"     The guessed letter does not appear in the word and the number of guesses remaining decreases by 1." + "\r\n" + 
"     If correct:" + "\r\n" + 
"     The letter you guessed appears in the word." + "\r\n" +
"     You WIN if:" + "\r\n" +
"     You correctly guess all the letters in the word before the number of guesses remaining reaches 0." + "\r\n" +
"     You LOSE if:" + "\r\n" +
"     You run out of guesses before the entire word is revealed." + "\r\n" +
"     But don't worry, you will be asked if you wish to play again whether you win or lose." + "\r\n" +
"     ===========================================================================================================" + "\r\n" +
"     If you need to exit the game at any time, you can do so by pressing Ctrl + C on your keyboard." + "\r\n" +
"     ===========================================================================================================" + "\r\n" +
"     Now let's play!"

function beginGame () {
    console.log(chalk.white(directions));
}

function randomWordChosen () {
    randomWord = targetWords[Math.floor(Math.random() * targetWords.length)]

    wordChosen = new Word(randomWord);
}

function guessWord () {
    if (guesses > 0 && points < 5) {

        console.log(wordChosen.display());

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

            if (randomWord.toUpperCase().indexOf(guess.toUpperCase()) === -1) {
                guesses--;
                console.log(chalk.red("Oops, that is not correct! " + guesses + " guesses left"))
            }
            else {
                if (points < 5) {
                    console.log(chalk.blue("That is correct!"))
                }
            }
            if (randomWord.trim() === wordChosen.display().trim()) {
                console.log(wordChosen.display());
                guesses = 10;
                points++;
                if (points < 5) {
                    console.log(chalk.cyanBright("That is correct! Next character!"));
                    randomWordChosen();
                }
                else {
                    winGame ();
                }
            }

            if (guesses === 0) {
                loseGame();
            }

            guessWord();
        });
    }
}

function loseGame() {
    console.log(chalk.cyanBright("Game over man, game over!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play another round?",
            default: true
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            guesses = 10;
            points = 0;
            randomWordChosen();
            guessWord();
        }
        else {
            console.log(chalk.yellow("That is okay, come back again when you feel worthy."));
            process.exit();
        }
    })
}

function winGame() {
    console.log(chalk.cyanBright("You won!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play another round?",
            default: true
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            guesses = 10;
            points = 0;
            randomWordChosen();
            guessWord();
        }
        else {
            console.log(chalk.yellow("That is okay, come back again when you feel worthy."));
            process.exit();
        }
    })
}

beginGame();
randomWordChosen();
guessWord();