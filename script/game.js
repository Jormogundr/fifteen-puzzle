"use strict";
var timer;

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
    
    drawBoard(array);
    return array;
}

function drawBoard(state) {
    var t = document.getElementById("game_board");
    var trs = t.getElementsByTagName("tr");
    var tds = null;
    var idx = 0;

    for (var i=0; i<trs.length; i++)
    {
        tds = trs[i].getElementsByTagName("td");
        for (var n=0; n<tds.length;n++)
        {
            tds[n].innerHTML = state[idx];
            idx++;
        }
    }
}

// generate the state of game board to move one piece to reach goal
function simpleState() {
    var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
    var insert_idx = Math.floor(Math.random() * array.length);
    var i = 0;
    var val = 1;
    while (i < array.length) {
        if (i == insert_idx) {
            array[i] = '';
            i++;
        } 
        else {
            array[i] = val;
            i++;
            val++;
        }
    }
    drawBoard(array);
    return array;

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

function swapTile(event, state) {
    const clickedCell = event.target.closest('td');
    if (!clickedCell) {return;} // Quit, did not click on cell
    const row = clickedCell.parentElement;
    console.log(clickedCell.innerHTML, row.rowIndex, clickedCell.cellIndex, state_idx);

    console.log("Clicked", clickedCell);
    console.log("Right", clickedCell.nextElementSibling);
    // check right
    if (clickedCell.nextElementSibling.innerHTML == '') {

    }

    console.log("Left", clickedCell.previousElementSibling);
    // check left
    if (clickedCell.previousElementSibling.innerHTML == '') {
        
    }

    // check up
    console.log("Up", row.parentElement.children[row.rowIndex - 1].children[clickedCell.cellIndex]);
    if (row.parentElement.children[row.rowIndex - 1].children[clickedCell.cellIndex] == '') {
        
    }

    // check down
    console.log("Down", row.parentElement.children[row.rowIndex + 1].children[clickedCell.cellIndex]);
    if (row.parentElement.children[row.rowIndex + 1].children[clickedCell.cellIndex] == '') {
        
    }
}

function resetTime() {
    initState();
    startGameTimeCount();
}

function simpleGame() {
    simpleState();
    startGameTimeCount();
}

// on successful document load, run the game
document.addEventListener("DOMContentLoaded", () => {
    // initialize game
    let goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
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
    tbody.addEventListener('click', function (e) {swapTile(e, state)});
});

    