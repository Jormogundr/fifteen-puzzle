"use strict";
var timer;
var state = Array(16);
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
var moveCount = 0;

// initialize game state by providing a randomly shuffled array with unique elements between 1 and 15
function initState() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    // TODO: re-init if we randomly generate win condition
    state = array;
    drawBoard(state);
    return array;
}


function drawBoard(arr) {
    var t = document.getElementById("game_board");
    var trs = t.getElementsByTagName("tr");
    var tds = null;
    var idx = 0;

    for (var i=0; i<trs.length; i++)
    {
        tds = trs[i].getElementsByTagName("td");
        for (var n=0; n<tds.length;n++)
        {
            tds[n].innerHTML = arr[idx];
            idx++;
        }
    }
}

function checkWinCon() {
    if (state.toString() === goal.toString()) {
        clearInterval(timer);
        let choice = confirm("You win! " + document.getElementById("game_time").innerHTML + " and Moves: " + moveCount + ". Click OK to play again.");
        if (choice) {
            state = initState();
            startGameTimeCount();
            moveCount = 0;
            updateMoveCount();
            drawBoard();
        }
    }
}

// generate the state of game board to move one piece to reach goal
function simpleState() {
    var array = Array(16);
    var coinToss = Math.random();
    if (coinToss > 0.5) {
        array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, '', 15];
    }
    else {
        array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '', 13, 14, 15, 12];
    }
    // TODO: re-init if we generate win condition
    drawBoard(array);
    return array;

}

function updateMoveCount() {
    document.getElementById("game_moves").innerHTML = "Moves: " + moveCount;
}

function startGameTimeCount(interval) {
    clearInterval(timer)
    // begin tracking time of play
    var seconds = 1;
    // Update the count down every 1 second
    timer = setInterval(function() {
        
        document.getElementById("game_time").innerHTML = "Time: " + seconds + "s ";
        seconds++
    }, 1000);
}

function swapTile(event) {
    const clickedCell = event.target.closest('td');
    if (!clickedCell) {return;} // Quit, did not click on cell
    const row = clickedCell.parentElement;
    var clickedIdx;
    var clickedVal;

    // check right
    if (clickedCell.nextElementSibling) {
        if (clickedCell.nextElementSibling.innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            state[clickedIdx + 1] = parseInt(clickedVal);
            state[clickedIdx] = '';
            moveCount++;
        }
    }

    // check left
    if (clickedCell.previousElementSibling) {
        if (clickedCell.previousElementSibling.innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            state[clickedIdx - 1] = parseInt(clickedVal);
            state[clickedIdx] = '';
            moveCount++;
        }
    }

    // check up
    if (row.rowIndex > 0) {
        if (row.parentElement.children[row.rowIndex - 1].children[clickedCell.cellIndex].innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            state[clickedIdx - 4] = parseInt(clickedVal);
            state[clickedIdx] = '';
            moveCount++;
        }
    }

    // check down
    if (row.rowIndex < 3) {
        if (row.parentElement.children[row.rowIndex + 1].children[clickedCell.cellIndex].innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            state[clickedIdx + 4] = parseInt(clickedVal);
            state[clickedIdx] = '';
            moveCount++;
        }
    }
    updateMoveCount();
    drawBoard(state);
    checkWinCon();
}

function resetTime() {
    state = initState();
    startGameTimeCount();
    moveCount = 0;
    updateMoveCount();
}

function simpleGame() {
    state = simpleState();
    startGameTimeCount();
    moveCount = 0;
    updateMoveCount();
}

// on successful document load, run the game
document.addEventListener("DOMContentLoaded", () => {
    // initialize game
    var state = initState();
    console.log(state)
    startGameTimeCount();

    // handle reset button clicks
    var reset = document.getElementById("button_reset");
    reset.addEventListener("click", resetTime);

    // handle simple game button clicks
    var simple_game = document.getElementById("button_simple");
    simple_game.addEventListener("click", simpleGame);

    // handle click events for each tile on board
    const tbody = document.querySelector('#game_board');
    tbody.addEventListener('click', function (e) {swapTile(e)});
});

    