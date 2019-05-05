
// Letter constructor

var Letter = function (character) {

    //  String value to store the underling character for the letter

    this.character = character;

    // Boolean value that stores whether that letter has been guessed yet

    this.isletterGuessed = false;

    // Function that returns the underlying character if the letter has been guessed

    this.display = function () {
        if (this.character == ' ') {
            return (' ');
        }
        else if (this.isletterGuessed) {
            return (this.character);
        }
        else if (this.character == "'") {
            return ("'");
        }
        else if (this.character == "-") {
            return ("-");
        }

        // Placeholder underscore if the letter has not been guessed

        else if (this.isletterGuessed === false) {
            return ("_");
        }
    }

    // Function that checks the underlying character and updates the boolean value to true if letter guessed correctly

    this.letterGuess = function (guess) {
        if (guess.toUpperCase() === this.character.toUpperCase()) {
            this.isletterGuessed = true;
        }
    }
}

// Exports Letter constructor for word.js to use

module.exports = Letter;