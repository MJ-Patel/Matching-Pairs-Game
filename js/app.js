let card = document.getElementsByClassName('card');
let cardsArray = [...card];
const deck = document.querySelector('.deck');
let count = 0;
let firstGuess = '';
let secondGuess = '';
const delay = 1100;
let moves = 0;
const counter = document.querySelector('.moves');
let star = document.getElementsByClassName('fa-star');
let starsArray = [...star];
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = document.querySelector('.timer');

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
      clicked.classList.add('selected')
    }
    else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    if (count === 2) {
      moveCounter();
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        match();
        guessesReset()
      }
      else {
        notMatched();
      }
    }
  }
  })
};

function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function(card) {
  card.classList.add('match');
  disable();
  })
};

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  textMoves();
  if (moves > 8 && moves < 12) {
      starsArray.forEach(function(star, i) {
        if (i > 1) {
          star.style.visibility = 'collapse'
        }
      })
  }
  else if (moves > 15) {
      starsArray.forEach(function(star, i) {
      if (i > 0) {
        star.style.visibility = 'collapse'
      }
    })
  }
};

function guessesReset() {
  count = 0;
  firstGuess = '';
  secondGuess = '';
  setTimeout(function() {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(function(card) {
    card.classList.remove('selected', 'unmatched');
    })
  }, delay)
  setTimeout(enable, delay);
};

function disable(){
    cardsArray.forEach(function(card){
        card.classList.add('disabled');
    });
}

function enable () {
  cardsArray.forEach(function(card){
      card.classList.remove('disabled');
  });
}

function notMatched() {
  let selected = document.querySelectorAll('.selected');
  let unmatched = document.querySelectorAll('unmatched')
  selected.forEach(function(card) {
  card.classList.add('unmatched');
  })
  disable();
  guessesReset();
};

function textMoves() {
  let textMoves = document.querySelector('.textMoves');
  if (moves === 1) {
    textMoves.innerHTML = 'Move';
    timerStart();
  }
  else if (moves > 1) {
    textMoves.innerHTML = 'Moves'
  }
};

function reset() {
  cardsArray.forEach(function(card) {
    card.classList.remove('match')
  })
  starsArray.forEach(function(star) {
    star.style.visibility = 'visible';
  })

  moves = 0;
  counter.innerHTML = moves;
}

function timerStart() {

  setInterval(function() {
    seconds++;
    timer.innerHTML = minutes+' mins '+seconds+' secs';
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
  }, 1000)
}
