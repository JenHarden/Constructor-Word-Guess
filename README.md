# Constructor-Word-Guess Game
## Overview:
```
This application is an inline command game of word guess.  This application uses JavaScript constructor functions 
to create letter and word objects, using the inquirer NPM package to prompt players to guess a letter.  
```
## Technologies Used:
```
    * node.js
    * node package manager (NPM)
        * Inquirer
        * Chalk
    * JavaScript constructor functions
```
## How to play the game:
    1. Clone the project repository to your computer.
    2. You will use your terminal, such as Bash, to run the application.
    3. Navigate to the folder that contains the files.
    4. Install the NPM packages.
    5. Enter "node index.js" onto the command line.
    6. You will see a list of rules and will be prompted to "Guess the Marvel Cinematic Universe Character".
        * Press any letter (A-Z either upper or lower case will be accepted).
        * You have ten chances to guess all of the letters.
            * If a letter is guessed incorrectly:
                * It will not appear in the word.
                * The number of guesses will decrease by one.
            * If a letter is guessed correctly:
                * The letter you guessed will appear in the word
        * You will win if:
            * You correctly guess all of the letters in the word before the number of guesses reaches 0.
            * You correctly guess five words.
        * You will lose if:
            * You run out of guess before the entire word is revealed.
        * But don't worry! You will be asked if you wish to play again, whether you win or lose.
        * If you chose to play again, you will be given another random word and the stats will reset.
        * If you chose not to play again, the application will take you back to the command line.
        * If you need to exit the game at any time during game play, you can do so by pressing Ctrl + C on your 
            keyboard.

## Screenshots

This screenshot shows the rules for how to play the game:
![image](/images/initialrules.png)

If you chose a letter correctly, this will be the message you see:
![image](/images/correctlyguessedletter.png)

If an incorrect letter is chosen, the below message is displayed:
![image](/images/incorrectlyguessedletter.png)

If the word is guessed correctly, you will see the confirmation it is correct and game play continues:
![image](/images/correctwordguessed.png)

If the number of guesses reaches 0, then the game is a loss with the following message displayed and the prompt to 
"Play again?":
![image](/images/outofguesses.png)

If five rounds of game is guessed correctly then the below win message will show, along with the prompt to 
"Play again?":
![image](/images/win.png)

If you chose to play again, the game will give the next word:
![image](/images/playagain.png)

If you chose to exit the game, then you will be placed back into the command line:
![image](/images/exitgame.png)