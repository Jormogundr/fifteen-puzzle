"use strict";
var timer;
var state = Array(16);
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];

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
    drawBoard(array);
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
        alert("You win! Time: " + document.getElementById("game_time").innerHTML);
        clearInterval(timer);
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
    // TODO: re-init if we generate win condition
    console.log(array)
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
        }
    }

    // check left
    if (clickedCell.previousElementSibling) {
        if (clickedCell.previousElementSibling.innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            console.log("Clicked val ", state[clickedIdx], " at idx ", (row.rowIndex*4) + clickedVal);
            state[clickedIdx - 1] = parseInt(clickedVal);
            state[clickedIdx] = '';
        }
    }

    // check up
    if (row.rowIndex > 1) {
        if (row.parentElement.children[row.rowIndex - 1].children[clickedCell.cellIndex].innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            console.log("Clicked val ", clickedVal, " at idx ", clickedIdx);
            state[clickedIdx - 4] = parseInt(clickedVal);
            state[clickedIdx] = '';
        }
    }

    // check down
    if (row.rowIndex < 3) {
        if (row.parentElement.children[row.rowIndex + 1].children[clickedCell.cellIndex].innerHTML == '') {
            clickedIdx = (row.rowIndex * 4) + clickedCell.cellIndex;
            clickedVal = clickedCell.innerHTML;
            console.log("Clicked val ", clickedVal, " at idx ", clickedIdx);
            state[clickedIdx + 4] = parseInt(clickedVal);
            state[clickedIdx] = '';
        }
    }
    drawBoard(state)
    checkWinCon()
}

function resetTime() {
    state = initState();
    startGameTimeCount();
    console.log("Reset ", state)
}

function simpleGame() {
    state = simpleState();
    startGameTimeCount();
    console.log("Simple reset", state)
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

    