const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const clearButton = document.getElementById('clearButton');

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, { once: true });
});

clearButton.addEventListener('click', clearBoard);

function cellClicked(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // Remove event listener to prevent changing the cell again
    cell.removeEventListener('click', cellClicked);
    checkForWinner();
}

function clearBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        // Re-add event listener to make cells clickable again
        cell.addEventListener('click', cellClicked, { once: true });
    });
    currentPlayer = 'X'; // Reset current player to 'X'
}

function checkForWinner() {
    // Add your logic to determine the winner and end the game
}
