let card = document.getElementsByClassName('card');
let cardsArray = [...card];
const deck = document.querySelector('.deck');
let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;
let delay = 1200;

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
        deck.append(item);
    })
};

for (var i = 0; i < cardsArray.length; i++) {
  cardsArray[i].addEventListener('click', function(event) {

  let clicked = event.currentTarget;

  if (clicked === previousTarget) {return};

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    else {
      secondGuess = clicked.dataset.name;
    clicked.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(guessesReset, delay);
      }
      else {
        setTimeout(guessesReset, delay);
      }
    }
    previousTarget = clicked;
  }

  })
};

function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
    card.classList.add('match');
  })
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
