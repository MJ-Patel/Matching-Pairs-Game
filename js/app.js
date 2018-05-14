let card = document.getElementsByClassName('card');
let cardsArray = [...card];
const deck = document.querySelector('.deck');
let count = 0;

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
    deck.innerHTML = "";
    [].forEach.call(shuffledCards, function(item) {
        deck.appendChild(item);
    })
};

for (var i = 0; i < cardsArray.length; i++) {
  cardsArray[i].addEventListener('click', function(event) {

  let clicked = event.target;
  if (count < 2) {
    count++;
    clicked.classList.add('selected');
  }
  })
};
