// script.js
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('resetButton');

// Expanded array of card values (added more pairs)
const cardValues = [
  'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg',
  'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg',
  'images/image5.jpg', 'images/image6.jpg', 'images/image7.jpg', // Add your new images here
  'images/image5.jpg', 'images/image6.jpg', 'images/image7.jpg' // Duplicate for pairs
];

let gameState = {
  shuffledValues: shuffle([...cardValues]),
  firstCard: null,
  secondCard: null,
  lockBoard: false,
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  gameBoard.innerHTML = '';
  gameState.shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = value;
    card.appendChild(img);
    gameBoard.appendChild(card);
  });
}

gameBoard.addEventListener('click', (event) => {
  if (!event.target.classList.contains('card')) return;
  flipCard(event.target);
});

function flipCard(card) {
  if (gameState.lockBoard || card === gameState.firstCard) return;
  card.classList.add('flipped');

  if (!gameState.firstCard) {
    gameState.firstCard = card;
  } else {
    gameState.secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  gameState.lockBoard = true;

  if (gameState.firstCard.dataset.value === gameState.secondCard.dataset.value) {
    gameState.firstCard.classList.add('matched');
    gameState.secondCard.classList.add('matched');
    resetBoard();
  } else {
    setTimeout(() => {
      gameState.firstCard.classList.remove('flipped');
      gameState.secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.lockBoard = false;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameState = {
    shuffledValues: shuffle([...cardValues]),
    firstCard: null,
    secondCard: null,
    lockBoard: false,
  };
  createCards();
}

createCards();
