// Creating an array of all cards in HTML
let card = document.getElementsByClassName('card');
let cardsArray = [...card];

// Selecting the entire deck
const deck = document.querySelector('.deck');

// Declaring the first and second guesses
let count = 0;
let firstGuess = '';
let secondGuess = '';

// Time delays for all cards, score-panel timer and modal
const delay = 1100;
const timerDelay = 1000;
const modalDelay = 3500;

// Declaring moves variable
let moves = 0;
const counter = document.querySelector('.moves');

// Declaring star rating variables and creating an array
let star = document.getElementsByClassName('fa-star');
let starsArray = [...star];

// Declaring time variables for score-panel timer
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = document.querySelector('.timer');

// Declaring mathched card variable
let matched = document.getElementsByClassName('match');

// Declaring end game modal variable
let modal = document.getElementById('congratsModal');

// Declaring empty interval variable for timer
let interval;

/**
 *@description creates a new array of randomly organised cards
 *@param {Object[]} array of unshuffled cards
 *@returns {array} new array of shuffled cards
 */
function shuffle(array) {
  let currentIndex = array.length,temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Shuffled cards appended to deck
function shuffleCards() {
  let shuffledCards = shuffle(cardsArray);

  for (let i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    });
  }
}

// Calls shuffleCards() when page is reloaded
document.body.onload = shuffleCards();

// Adds click event to each card
for (let i = 0; i < cardsArray.length; i++) {
  cardsArray[i].addEventListener('click', function(event) {
    let clicked = event.currentTarget;
    if (count < 2) {
      count++;
      if (count === 1) {
        // Assigns the type of the card to clicked card
        firstGuess = clicked.dataset.name;
        clicked.classList.add('selected');
      } else {
        secondGuess = clicked.dataset.name;
        clicked.classList.add('selected');
      }
      if (count === 2) {
        // Increments the moves
        moveCounter();
      }
      // Check to see if both cards are of the same type and not empty strings
      if (firstGuess !== '' && secondGuess !== '') {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          setTimeout(guessesReset, delay);
          setTimeout(openModal, modalDelay);

        } else {
          setTimeout(notMatched, delay);
        }
      }
    }
  });
}

// When two cards are a match
function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
    card.classList.add('match');
    disable();
  });
}

// When two cards are not a match
function notMatched() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
    card.classList.add('unmatched');
  });
  disable();
  guessesReset();
}

// Resets the state of cards
function guessesReset() {

  // Resets the guesses
  count = 0;
  firstGuess = '';
  secondGuess = '';

  // Removes selected and unmatched clases for each guessed card
  setTimeout(function() {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(function(card) {
      card.classList.remove('selected', 'unmatched');
    });
  }, delay);
  setTimeout(enable, delay);
}

// Disables the cursor so cards can't be clicked again
function disable() {
  cardsArray.forEach(function(card) {
    card.classList.add('disabled');
  });
}

// Re-enables the cards
function enable() {
  cardsArray.forEach(function(card) {
    card.classList.remove('disabled');
  });
}

// Increments the amount of moves displayed.
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  textMoves();

  /*
   * Check to determine the player's rating after
   * certain number of moves have been exceeded
   */
  if (moves > 12 && moves < 19) {
    starsArray.forEach(function(star, i) {
      if (i > 1) {
        star.style.visibility = 'collapse';
      }
    });
  } else if (moves > 20) {
    starsArray.forEach(function(star, i) {
      if (i > 0) {
        star.style.visibility = 'collapse';
      }
    });
  }
}

// Determines if the word move should be singular or plural
function textMoves() {
  let textMoves = document.querySelector('.textMoves');
  if (moves === 1) {
    textMoves.innerHTML = 'Move';
    timerStart();
  } else if (moves > 1) {
    textMoves.innerHTML = 'Moves';
  }
}

// Resets the entire game
function reset() {
  cardsArray.forEach(function(card) {
    card.classList.remove('match', 'unmatched', 'selected', 'disabled');
  });
  starsArray.forEach(function(star) {
    star.style.visibility = 'visible';
  });

  // Resets moves
  count = 0;
  moves = 0;
  counter.innerHTML = moves;

  // Resets timer
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.innerHTML = minutes + ' min(s) ' + seconds + ' secs(s)';

  // Shuffles the cards
  shuffleCards();
}

// Starts the timer after the first move has been made
function timerStart() {
  interval = setInterval(function() {
    seconds++;
    timer.innerHTML = minutes + ' min(s) ' + seconds + ' secs(s)';
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
  }, timerDelay);
}

// Diplays the end game modal after all cards have been matched
function openModal() {
  let finalTimer = timer.innerHTML;
  let finalRating = document.querySelector('.stars').innerHTML;
  if (matched.length == 16) {
    clearInterval(interval);
    document.getElementById('total-moves').innerHTML = moves;
    document.getElementById('final-time').innerHTML = finalTimer;
    document.getElementById('final-rating').innerHTML = finalRating;
    modal.style.display = 'block';
  }
}

// Closes the end game modal
function closeModal() {
  modal.style.display = 'none';
}
