// Word.js: 
// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:

// An array of `new` Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) 
// that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

var Letter = require("./letter.js");

var Word = function (word) {
    this.makeWord = function (word) {
        var storedLetters = [];
        for (var i = 0; i < word.length; i++) {
            var currentLetter = new Letter(word[i]);
            storedLetters.push(currentLetter);
        }
        return storedLetters;
    }

    this.letters = this.makeWord(word);
    this.chosenWord = word;

    this.checkGuess = function (guess) {
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuess(guess);
        }
    }

    this.display = function () {
        var storedLetters = ' ';
        for (var i = 0; i < this.letters.length; i++) {
            storedLetters += this.letters[i].display();
        }
        return storedLetters;
    }

}
module.exports = Word;