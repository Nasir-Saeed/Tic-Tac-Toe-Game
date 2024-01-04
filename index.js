const board = document.getElementById('board');
const nameModal = document.getElementById('nameModal');
const playerNameInput = document.getElementById('playerName');
const startGameBtn = document.getElementById('startGameBtn');
const winModal = document.getElementById('winModal');
const winModalText = document.getElementById('winModalText');
const startNewGameBtn = document.getElementById('startNewGameBtn');
const endCurrentGameBtn = document.getElementById('endCurrentGameBtn');
const winnerDetailsTableContainer = document.getElementById('winnerDetailsTableContainer');
const timerDisplay = document.getElementById('timer');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let playerName = '';
let startTime;
let endTime;
let timerInterval;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      return true;
    }
  }

  return false;
}

function checkTie() {
  return gameBoard.every(cell => cell !== '');
}

function handleClick(index) {
  if (!gameBoard[index] && !gameOver) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      clearInterval(timerInterval);
      endTime = new Date();
      const timeDiff = Math.floor((endTime - startTime) / 1000); // in seconds
      showWinModal(`${currentPlayer} wins! Hurrah, ${playerName}! 🎉`, timeDiff);
    } else if (checkTie()) {
      showWinModal("It's a tie! Well played.", 0);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
  });
}

function showNameModal() {
  nameModal.style.display = 'block';
}

function hideNameModal() {
  nameModal.style.display = 'none';
}

function showWinModal(message, timeDiff) {
  timerDisplay.style.display = 'block';
  winModalText.textContent = message;
  timerDisplay.textContent = `Time: ${timeDiff} seconds`;
  startNewGameBtn.addEventListener('click', () => startNewGame());
  endCurrentGameBtn.addEventListener('click', () => endCurrentGame());
  winModal.style.display = 'block';
}

function hideWinModal() {
  timerDisplay.style.display = 'none';
  winModal.style.display = 'none';
}

function startNewGame() {
  hideWinModal();
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  startGame();
}

function endCurrentGame() {
  hideWinModal();
  location.reload(); // Reload the page
}

function startGame() {
  playerName = playerNameInput.value.trim() || 'Player';
  hideNameModal();
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  renderBoard();
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsedSeconds} seconds`;
}

function newGame() {
  hideWinModal();
  startNameModal();
}

startGameBtn.addEventListener('click', startGame);

function startNameModal() {
  showNameModal();
}

startNameModal();