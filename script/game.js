"use strict";
// Move counter
//document.getElementById("game_moves").innerHTML = "Moves: 0";

// initialize game state by providing a randomly shuffled array with unique elements between 1 and 15
function initState() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']
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
    
    drawBoard(array)
    return array;
}

function drawBoard(state) {
    var t = document.getElementById("game_board");
    var trs = t.getElementsByTagName("tr");
    var tds = null;
    var idx = 0

    for (var i=0; i<trs.length; i++)
    {
        tds = trs[i].getElementsByTagName("td");
        for (var n=0; n<tds.length;n++)
        {
            tds[n].innerHTML = state[idx]
            idx++
        }
    }
}

// generate the state of game board to move one piece to reach goal
function simpleState() {
    var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'']
    var insert_idx = Math.floor(Math.random() * array.length)
    var i = 0
    var val = 1
    console.log(array, array.length, insert_idx)
    while (i < array.length) {
        if (i == insert_idx) {
            array[i] = ''
            i++
        } 
        else {
            array[i] = val
            i++
            val++
        }
    }
    console.log(array)
    drawBoard(array)
    return array

}

function startGameTimeCount() {
    // begin tracking time of play
    var seconds = 1
    // Update the count down every 1 second
    return setInterval(function() {
    document.getElementById("game_time").innerHTML = "Time: " + seconds + "s ";
    seconds++
    }, 1000);
}

function swapTile(state) {
    // split game state into 2D array for simpler tile selection validation
    const array = [];
    while(state.length) array.push(state.splice(0,4));
    console.log(array, state)
}

function resetTime(timer) {
    initState()
    clearTimeout(timer)
    startGameTimeCount()
}

function simpleGame(timer) {
    simpleState()
    clearTimeout(timer)
    startGameTimeCount()
}

// on successful document load, run the game
document.addEventListener("DOMContentLoaded", () => {
    // initialize game
    let goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, '']
    var state = initState()
    console.log( "State is " + state)
    var timer = startGameTimeCount()

    // handle reset button clicks
    var reset = document.getElementById("button_reset")
    reset.addEventListener("click", function() {resetTime(timer)});

    // handle simple game button clicks
    var reset = document.getElementById("button_simple")
    reset.addEventListener("click", function() {simpleGame(timer)});

    // handle click events for each tile on board
    var cell1 = document.getElementById("cell1")
    reset.addEventListener("click", function() {swapTile(state)});


});

    