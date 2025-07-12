const emojis = ['😀','🐶','🍕','🚗','🌟','🎵','🐱','⚽'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matched = [];
let moves = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  gameBoard.innerHTML = '';
  cards = shuffle([...emojis, ...emojis]);
  flippedCards = [];
  matched = [];
  moves = 0;
  timer = 0;
  movesDisplay.textContent = moves;
  timerDisplay.textContent = '0s';
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer + 's';
  }, 1000);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flipped') || flippedCards.length === 2) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched.push(card1.dataset.emoji);
    flippedCards = [];

    if (matched.length === emojis.length) {
      clearInterval(interval);
      setTimeout(() => {
        alert(`🎉 You won in ${moves} moves and ${timer}s!`);
      }, 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 700);
  }
}

restartBtn.addEventListener('click', startGame);
startGame();
