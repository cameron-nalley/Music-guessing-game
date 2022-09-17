const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-Btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomSong() {
// getting random object from songsList
    let ranObj = songList[Math.floor(Math.random() * songList.length)];
    word = ranObj.song;
    maxGuesses = 8; corrects = []; incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html = '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}
randomSong();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key)) {
        if(word.includes(key)) { // if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--; // decrement maxGuesses by 1
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
   
    typingInput.value = "";
setTimeout(() => {
    if(corrects.length === word.length) {
        alert(`Congrats! you know your music! ${word.toUpperCase()}`);
        randomSong(); //calling the randomSong function, so game reset
    }else if(maxGuesses < 1) {
        alert("Game over! you're a failure");
        for (let i = 0; i < word. length; i ++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }
 });
}

resetBtn.addEventListener("click", randomSong);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());