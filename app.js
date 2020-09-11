const startBtn = document.getElementById("start-btn");
const startBtnText = document.getElementById("start-btn-text");
const timeText = document.getElementById("time-text");

let seconds = 0;
let minutes = 0;
let hours = 0;

let stopwatchId = null;

timeText.innerText = `00:00:00`;

let secondsOnDisplay = 0;
let minutesOnDisplay = 0;
let hoursOnDisplay = 0;

// stopwatch
function startStopwatch() {
  seconds++;
  console.log("seconds:", seconds, "minutes:", minutes);

  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;
  }

  if (minutes / 60 === 1) {
    minutes = 0;
    hours++;
  }

  renderStopwatch();
}

// render
function renderStopwatch() {
  secondsToDisplay = seconds;
  minutesToDisplay = minutes;
  hoursToDisplay = hours;

  seconds < 10
    ? (secondsToDisplay = `${0}${secondsToDisplay}`)
    : (secondsToDisplay = `${secondsToDisplay}`);

  minutes < 10
    ? (minutesToDisplay = `${0}${minutesToDisplay}`)
    : (minutesToDisplay = `${minutesToDisplay}`);

  hours < 10
    ? (hoursToDisplay = `${0}${hoursToDisplay}`)
    : (hoursToDisplay = `${hoursToDisplay}`);

  timeText.innerText = `${hoursToDisplay}:${minutesToDisplay}:${secondsToDisplay}`;
}

// event listener
startBtn.addEventListener("click", () => {
  if (!stopwatchId) {
    stopwatchId = setInterval(startStopwatch, 10);
    startBtn.className = "start-btn-started";
    startBtnText.innerText = "STOP";
    console.log("stopwatch started");
  } else {
    clearInterval(stopwatchId);
    stopwatchId = null;
    seconds = 0;
    minutes = 0;
    hours = 0;
    startBtn.className = "start-btn-stopped";
    startBtnText.innerText = "START";
    console.log("stopwatch stopped");
  }
});
