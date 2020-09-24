const startBtn = document.getElementById("start-btn");
const startBtnText = document.getElementById("start-btn-text");
const timeText = document.getElementById("time-text");
const timesList = document.getElementById("times-list");
const timesListWrapper = document.getElementById("times-list-wrapper");
const calculationDiv = document.getElementById("calculation");

let seconds = 0;
let minutes = 0;
let hours = 0;

let stopwatchId = null;

timeText.innerText = `00:00:00`;

// stopwatch
function startStopwatch() {
  seconds++;

  if (seconds === 60) {
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

// reset
function stopStopwatchAndResetNumbers() {
  clearInterval(stopwatchId);
  stopwatchId = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeText.innerText = `00:00:00`;
}

// button class and name
function toggleButtonState(state) {
  if (state === "started") {
    startBtn.className = "start-btn-started";
    startBtnText.innerText = "STOP";
  } else {
    startBtn.className = "start-btn-stopped";
    startBtnText.innerText = "START";
  }
}

// event listeners
startBtn.addEventListener("click", () => {
  // stopwatch starts
  if (!stopwatchId) {
    stopwatchId = setInterval(startStopwatch, 1000);
    toggleButtonState("started");
    // stopwatch stops
  } else {
    renderTimesList();
    calculateAndRenderTotal();
    stopStopwatchAndResetNumbers();
    toggleButtonState("stopped");
  }
});

// results will be stored to an array
let results = [];

// event listener on removing item
timesList.addEventListener("click", (e) => {
  if (e.target.className === "result-time") {
    removeTimeFromList(e);
    removeItemFromArray(e.target.parentNode.id);
    calculateAndRenderTotal();
    if (!results.length) {
      calculationDiv.innerHTML = "";
    }
  }
});

// remove item
function removeTimeFromList(e) {
  e.target.parentNode.remove();
}

// remove from array
function removeItemFromArray(id) {
  results = results.filter((result) => {
    return result.id != id;
  });
}

// render list
function renderTimesList() {
  timesListWrapper.classList.remove("hide-element");

  let randomIdentifier = Math.random();
  let li = `
    <li id=${randomIdentifier}>
        <span title="click to remove" class="result-time">${getDisplayTimes(
          hours
        )}:${getDisplayTimes(minutes)}:${getDisplayTimes(seconds)}</span>    
    </li>`;
  timesList.insertAdjacentHTML("afterbegin", li);

  pushResultToTimesList({
    id: randomIdentifier,
    seconds: seconds,
    minutes: minutes,
    hours: hours,
  });
}

// push results fn
function pushResultToTimesList(result) {
  results.push(result);
}

// calc and render total
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
  calculationDiv.innerHTML = `Your total time so far: 
  <span class="calculation-total">
  ${hoursTotal}h
  ${minutesTotal}m
  ${secondsTotal}s
  </span>`;
}
