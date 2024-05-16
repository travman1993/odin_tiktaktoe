let currentPlayer;
let player1;
let player2;

function newGame() {
    player1 = document.querySelector('#player1').value;
    player2 = document.querySelector('#player2').value;

    const gameBoard = document.querySelector('#gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.addEventListener('click', handleMove);
          gameBoard.appendChild(cell);
      }
      gameBoard.appendChild(document.createElement('br'));
    }
    document.querySelector('#result').textContent = `Welcome ${player1} and ${player2}! ${player1} goes first.`;
  }

let gameDone = false;

function handleMove(e) {
    if (gameDone || e.target.textContent !== '') return;
    e.target.textContent = currentPlayer === player1 ? 'X' : 'O';
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    const winner = checkWin();
    if (winner) {
      document.querySelector('#result').textContent = `Congrats, ${currentPlayer} has won!`;
      gameDone = true;
      return;
    }
    if (document.querySelector('#result').textContent !== '') {
      document.querySelector('#result').textContent = '';
    }
}
  
  document.querySelector('#idBtn').addEventListener('click', newGame);

  function checkWin() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let combo of combos) {
      if (
        cells[combo[0]].textContent !== '' &&
        cells[combo[0]].textContent === cells[combo[1]].textContent &&
        cells[combo[1]].textContent === cells[combo[2]].textContent
      ) {
        return cells[combo[0]].textContent;
      }
    }
  
    return null;
  }
function restartGame() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = player1;
    gameDone = false;
    document.querySelector('#result').textContent = 'Play Again!';
}
