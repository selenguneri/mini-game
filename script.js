
// GAME PART
let board = ['', '', '', '', '', '', '', '', ''];
let currPlayer = '♡'; // change to icons maybe, for now 1 or 2
let gameActive = true;
let prevWinner = ''
// icons : ♡ and ♢  

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function makeMove(index) {
    // not empty or game not active
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // if move can be made
    board[index] = currPlayer;
    document.getElementById(`cell-${index}`).textContent = currPlayer; // puts the current player icon into that cell
    check(); // check for winner
}

function check() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }

        if (board[a] === board [b] && board[b] === board[c]) { // if all icons are the same in a winning triplet
            roundWon = true;
            highligtWinningCells(a, b, c);
            prevWinner = currPlayer;
            break;
        }
    }

    if (roundWon) {
        // display winning message
        if(currPlayer === '♡') {
            heartsWon();
        }
        document.getElementById('status').textContent = `Player ${currPlayer} wins!!!`;
        gameActive = false;
        return;
    }

    // if its a draw
    if (!board.includes('')) {
        // display draw message
        document.getElementById('status').textContent = 'It\'s a draw!';
        draw();
        gameActive = false;
        return;
    }

    // otherwise
    currPlayer = currPlayer === '♡' ? '♢' : '♡';
    // display current player turn message
    document.getElementById('status').textContent = `Player ${currPlayer}\'s turn.`;
}

function highligtWinningCells(a, b, c) {
    document.getElementById(`cell-${a}`).classList.add('winning');
    document.getElementById(`cell-${b}`).classList.add('winning');
    document.getElementById(`cell-${c}`).classList.add('winning');
}

function draw() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.add('draw');
    });
}

function reset() {
    board = ['', '', '', '', '', '', '', '', ''];
    currPlayer = '♡';
    gameActive = true;
    // players turn message, the winner gets to go first
    document.getElementById('status').textContent = `Player ${prevWinner}\'s turn.`;
    // remove winning highlight from each cell
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
        cell.classList.remove('draw');
    });
}


// CONGRATS
function heartsWon() {
    document.getElementById('winning-message').style.display = 'block';
    console.log('hearts won');
}

if (window.location.pathname.endsWith("page-msg.html")) {
    growPics();
}

// MESSAGE PAGE
function growPics() {
    window.addEventListener('scroll', function() {
        let pics = this.document.querySelectorAll("img");
        let scrollPos = this.window.scrollY;

        pics.forEach(pic => {
            if (scrollPos > 200) {
                pic.classList.add('grow');
            }
            else {
                pic.classList.remove('grow');
            }
        })
    })
}


// GIFT PAGE
function giftClick() {
    document.getElementById('blur-msg').style.display = 'flex';
    document.getElementById('hint-btn').style.display = 'flex';
}

function hintClick() {
    document.getElementById('hint-popup').style.display = 'block';
}