
// The Word constructor and index.js will be dependent on the letter.js file, so this will make it required

var Letter = require("./letter.js");

// Word constructor used to create an object representing the current word

var Word = function (word) {

    this.makeWord = function (word) {

        // An array of letter objects representing the letters of the underlying word

        var storedLetters = [];
        for (var i = 0; i < word.length; i++) {
            var currentLetter = new Letter(word[i]);
            storedLetters.push(currentLetter);
        }
        return storedLetters;
    }

    this.letters = this.makeWord(word);
    this.chosenWord = word;

    // Function that calls the guess function on each letter object 

    this.checkGuess = function (guess) {
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuess(guess);
        }
    }

    // Function that returns a string representing the word

    this.display = function () {
        var storedLetters = ' ';
        for (var i = 0; i < this.letters.length; i++) {
            storedLetters += this.letters[i].display();
        }
        return storedLetters;
    }

}

// Exports Word constructor for index.js to use

module.exports = Word;