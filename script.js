// a function to assign who is what player 
// create x and y variables ? 

// create a 3x3 grid 
// player turn function?? 

// allow the current player to tap on a square and
// mark their variable via display

// create a variable called win conditions

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-button');

const winConditions = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let running = false;


// options are an array of empty strings 

// initialize game function 
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
// cellClicked 
function cellClicked() {

    const cellIndex = this.getAttribute("data-cell-index");
    
    if (options[cellIndex] != "" || !running) {
        return;
    } 

    updateCell(this, cellIndex);
   
    checkWinner(); 
}
// updateCell
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// change player 
function changePlayer() {
 currentPlayer = (currentPlayer == "X") ? "O" : "X";
 statusText.textContent = `${currentPlayer}'s turn`; 
}
// function checkWinner
 function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        const cellD = options[condition[3]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        } 
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } 
    else {
        changePlayer();
    }
 }
//function restart game
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
//


initializeGame();
changePlayer();
