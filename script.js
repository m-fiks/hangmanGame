$(document).ready(function() {
//variables
const characters = ['leia', 'luke', 'han', 'chewy', 'yoda'];
//where guessed letters originally pushed to
let correctArray = [];
let wrongArray= [];
//array of letters filtered to only contain one of each letter
let uniqueCorrect=[];
let uniqueWrong=[];
let underScoreCounter=0;
let underScore= [];

// pick random word from characters array
let chosenOne = characters[Math.floor(Math.random() * characters.length)];

//counters
let guessesRemaining = (chosenOne.length) + 3;

//create underscores to correspond to chosen random word
function underScoreCreator() {
    for (let i = 0; i < chosenOne.length; i++){
        underScore[i] = "_";
        underScoreCounter=(chosenOne.length);
        }
    return underScore;
}

//innerHTML business
//display '_' for selected word
document.querySelector('#target').innerHTML=(underScoreCreator().join(' '));
document.querySelector('#lives-3').innerHTML=(guessesRemaining);

//game play
//get keyboard input(guess from player)
document.addEventListener("keypress", (event) => {
    //get numerical code from key pressed (a-z : 65-90)
    let keyNumbs = event.keyCode;
    let keyLetter = String.fromCharCode(keyNumbs).toLowerCase();
    console.log(keyLetter)
    //compare to chosenOne
    //if user guesses a correct letter push to correctArray - else push to wrongArray
    if(chosenOne.indexOf(keyLetter) > -1) {
        correctArray.push(keyLetter);
        //only allow for one instance of a letter
        uniqueCorrect = correctArray.filter((item, i, ar) => {
            return ar.indexOf(item) === i
        });

    } else {
        wrongArray.push(keyLetter);
        uniqueWrong = wrongArray.filter((item, i, ar) => {
             return ar.indexOf(item) === i; 
        });
        document.querySelector("#letters-guessed2").innerHTML = uniqueWrong;
        guessesRemaining--;
        document.querySelector("#lives-3").innerHTML = guessesRemaining;

    }

    //have letter take place of underscore
     for (let j=0; j < chosenOne.length; j++){
        if (chosenOne[j] === keyLetter) {
        underScore[j] = keyLetter;
        guessesRemaining--;
        document.querySelector("#lives-3").innerHTML =(guessesRemaining);
    }
}

document.querySelector('#target').innerHTML=(underScore.join(' '));

//lose conditions
//win conditions not totally correct but uniqueCorrect.length does not work ???
if (correctArray.length === chosenOne.length){
        $('.text-space').append('<p class="text"></p>')
        $('.text').text('GOOD JOB U GUESSED CORRECTLY')
        setTimeout(() => {
        window.location.reload();
    }, 3000);
} else if (guessesRemaining === 0){
    $('.text-space').append('<p class="text"></p>')
    $('.text').text('BUMMER.. U DID NOT GUESS CORRECTLY')
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

});


});