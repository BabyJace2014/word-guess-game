// Create an array of Children Shows
const shows = ['Sesame-Street', 'Arthur', 'Dinosaur-Train', 'Sid-the-Science Kid', 'Caillou', 'Teletubbies', 'Paw-Patrol', 'Doc-McStuffins', 'Lazy-Town', 'Batman', 'Tom-and-Jerry'];
// Choose show randomly
let randNum = Math.floor(Math.random() * shows.length);
let choosenShow = shows[randNum];
let correctLetter = [];
let lettersGuessed = [];
let underScore = [];


// Create underscores based on length of show
let generateUnderscore = () => {
    for(let i = 0; i < choosenShow.length; i++) {
        underScore.push('_');
    }
    return underScore;
}


// Get user guess
document.addEventListener('keypress', (event) => {
    let keyword = String.fromCharCode(event.keyCode);
// If user guess is right   
    if(choosenShow.indexOf(keyword) > -1) {
// Add to letters guessed and correct underscore spot       

    }
});
// Check if guess is correct
// If correct populate underscore and letter guessed
// If incorrect populate onkly letter guessed
