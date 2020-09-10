const startBtn = document.getElementById("start-btn");
const startBtnText = document.getElementById("start-btn-text");
const timeMs = document.getElementById("time-ms");
const timeSec = document.getElementById("time-sec");
const timeMin = document.getElementById("time-min");

startBtn.addEventListener("click", (e) => {
  toggleTimer();
});

let timerId = null;
let ms = 0;
let sec = 0;
let min = 0;

function toggleTimer() {
  console.log(startBtnText.innerText);
  toggleBtnClassName();
  toggleBtnText();
  if (!timerId) {
    timerId = setInterval(() => {
      ms += 1;
      renderTime();
    }, 10);
  } else {
    ms = 0;
    sec = 0;
    min = 0;
    console.log("stopwatch stopped");
    clearInterval(timerId);
    timerId = null;
  }
}

function renderTime() {
  timeSec.innerText = sec;
  timeMin.innerText = min;
  if (ms === 100) {
    timeSec.innerText++;
    sec++;
    ms = 0;
  }
  if (sec === 60) {
    timeMin.innerText++;
    min++;
    sec = 0;
  }
}

function toggleBtnClassName() {
  if (startBtn.className === "start-btn-start") {
    startBtn.className = "start-btn-stop";
  } else {
    startBtn.className = "start-btn-start";
  }
}

function toggleBtnText() {
  startBtnText.innerText === "STOP"
    ? (startBtnText.innerText = "START")
    : (startBtnText.innerText = "STOP");
}

// every time the minute counter gets to 60, change it to 0 and change the hour counter to 1

// button class

// double digits

// push values to bottom and calc time sum

// add clear button

// push to local storage
