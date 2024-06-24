const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    lapList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = Math.floor(time % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
