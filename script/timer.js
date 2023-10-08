// keep track of time since game started
var seconds = 1
// Update the count down every 1 second
setInterval(function() {

  document.getElementById("game_time").innerHTML = "Time: " + seconds + "s ";
  seconds++
    
}, 1000);