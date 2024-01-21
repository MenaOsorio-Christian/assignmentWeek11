// JavaScript logic for the Tic-Tac-Toe game

// Variables to track the current player, game board state, and game status
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle player moves
function makeMove(cell) {
  // Get the index of the clicked cell in the board array
  const index = Array.from(cell.parentElement.children).indexOf(cell);

  // Check if the selected cell is empty and the game is still active
  if (board[index] === '' && gameActive) {
    // Update the board and cell display with the current player's symbol
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    // Check for a win or draw, switch to the next player, and update the turn indicator
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turn').innerText = currentPlayer + "'s Turn";
  }
}

// Function to check for a win based on predefined patterns
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Iterate through win patterns and check if the current player has won
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Announce the winner and end the game
      announceWinner(board[a]);
    }
  }
}

// Function to check for a draw when the board is full
function checkDraw() {
  if (!board.includes('')) {
    // Announce a draw and end the game
    announceWinner('Draw');
  }
}

// Function to display the winner or draw message using Bootstrap alert
function announceWinner(winner) {
  gameActive = false;
  let message = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} wins!`;

  // Create and append a Bootstrap alert element with the winner message
  const alertElement = document.createElement('div');
  alertElement.className = 'alert alert-success mt-3';
  alertElement.setAttribute('role', 'alert');
  alertElement.innerText = message;
  document.body.appendChild(alertElement);
}

// Function to restart the game by resetting variables and clearing the board
function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Update the turn indicator
  document.getElementById('turn').innerText = "X's Turn";

  // Reset the cells and remove the winner alert if present
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.innerText = '';
  }

  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    alertElement.remove();
  }
}
