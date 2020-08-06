const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for the game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

fetch('https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D', {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    'x-rapidapi-key': 'ff61de8c3fmshdbbdcfd2003501ep1d77b7jsn0bc9bc4a1b9b',
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in loval storage or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// focus text on start
text.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// start countdown
const timeInterval = setInterval(updateTime, 1000);

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// game over show end screen
function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time ran out<h1>
    <p>You final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endGameEl.style.display = 'flex';
}
addWordToDOM();

// event listeners
// typing
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input
    e.target.value = '';

    // add time
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
