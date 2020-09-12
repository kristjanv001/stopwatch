const startBtn = document.getElementById("start-btn");
const startBtnText = document.getElementById("start-btn-text");
const timeText = document.getElementById("time-text");
const timesList = document.getElementById("times-list");
const calculationDiv = document.getElementById("calculation");

let seconds = 0;
let minutes = 0;
let hours = 0;

let stopwatchId = null;

timeText.innerText = `00:00:00`;

// stopwatch
function startStopwatch() {
  seconds++;

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

// get display times
function getDisplayTimes(time) {
  let timeToDisplay = time;
  time < 10
    ? (timeToDisplay = `${0}${timeToDisplay}`)
    : (timeToDisplay = `${timeToDisplay}`);
  return timeToDisplay;
}

// render
function renderStopwatch() {
  timeText.innerText = `${getDisplayTimes(hours)}:${getDisplayTimes(
    minutes
  )}:${getDisplayTimes(seconds)}`;
}

// event listeners
startBtn.addEventListener("click", () => {
  if (!stopwatchId) {
    stopwatchId = setInterval(startStopwatch, 1);
    startBtn.className = "start-btn-started";
    startBtnText.innerText = "STOP";
    console.log("stopwatch started");
  } else {
    // make this into a fn that converts it all to seconds
    pushResultToTimesList({ seconds: seconds, minutes: minutes, hours: hours });
    renderTimesList();
    calculateAndRenderTotal();
    clearInterval(stopwatchId);
    stopwatchId = null;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timeText.innerText = `00:00:00`;
    startBtn.className = "start-btn-stopped";
    startBtnText.innerText = "START";
    console.log("stopwatch stopped");
  }
});

// PART II

timesList.addEventListener("click", (e) => {
  if (e.target.className === "result-time") {
    removeTimeFromList(e);
  }
});

const results = [];

// remove item
function removeTimeFromList(e) {
  e.target.parentNode.remove();
}

// push results fn
function pushResultToTimesList(result) {
  results.push(result);
}

// render list fn
function renderTimesList() {
  let li = `
    <li >
        <span title="click to remove" class="result-time">${getDisplayTimes(
          hours
        )}:${getDisplayTimes(minutes)}:${getDisplayTimes(seconds)}</span>    
    </li>`;
  timesList.insertAdjacentHTML("afterbegin", li);
}

function calculateAndRenderTotal() {
  let secondsTotal = 0;
  let minutesTotal = 0;
  let hoursTotal = 0;

  results.forEach((result) => {
    secondsTotal += result.seconds;
    minutesTotal += result.minutes;
    hoursTotal += result.hours;

    if (secondsTotal >= 60) {
      minutesTotal += Math.floor(secondsTotal / 60);
      secondsTotal -= 60;
    }

    if (minutesTotal >= 60) {
      hoursTotal += Math.floor(minutesTotal / 60);
      minutesTotal -= 60;
    }
  });

  calculationDiv.innerHTML = `
  <span>
  ${hoursTotal}h
  ${minutesTotal}m and 
  ${secondsTotal}s
  </span>`;
}

// <a class="remove">&#x2a2f;</a>
//  <a href="#" title="Sample tooltip" class="tooltip">Link</a>
