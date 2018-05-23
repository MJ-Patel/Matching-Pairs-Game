let card = document.getElementsByClassName('card');
let cardsArray = [...card];
const deck = document.querySelector('.deck');
let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;
let delay = 1200;
let moves = 0;
let counter = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star')

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var shuffledCards = shuffle(cardsArray);

for (var i = 0; i < shuffledCards.length; i++){
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    })
};

for (var i = 0; i < cardsArray.length; i++) {
  cardsArray[i].addEventListener('click', function(event) {
  let clicked = event.currentTarget;
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected', 'disabled');
    }
    else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected', 'disabled');
    }
    if (count === 2) {
      moveCounter();
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(guessesReset, delay);
      }
      else {
        setTimeout(enable, delay);
        setTimeout(guessesReset, delay);
      }
    }
  }
  })
};

function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
  card.classList.add('match');
  })
};

function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves > 8 && moves < 12) {
      for (var i = 0; i < stars.length; i++) {
        if (i > 1) {
          stars[i].style.visibility = 'collapse'
        }

      }
  }
  else if (moves > 15) {
    for (var i = 0; i < stars.length; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse'
      }
    }
  }
};

function guessesReset() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
  card.classList.remove('selected');
  })
};

function enable() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
  card.classList.remove('disabled');
  })
}
